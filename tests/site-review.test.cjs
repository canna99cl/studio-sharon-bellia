const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

function attributeValue(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`, 'i')
  );
  return match ? (match[1] ?? match[2] ?? match[3]) : null;
}

function anchorHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => ({ tag: match[0], href: attributeValue(match[0], 'href') }));
}

function normalizedLocalPath(href, sourceFile) {
  const url = new URL(href, `https://site.test/${sourceFile}`);
  return url.origin === 'https://site.test' ? url.pathname : null;
}

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16));
}

function luminance(rgb) {
  return rgb
    .map((channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(foreground, background) {
  const a = luminance(hexToRgb(foreground));
  const b = luminance(hexToRgb(background));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test('public pages describe professional areas without unearned specialist titles', () => {
  const combined = htmlFiles.map(read).join('\n');
  assert.doesNotMatch(combined, /Psicologa clinica/i);
  assert.doesNotMatch(combined, /Psicoterapia in formazione/i);
  assert.doesNotMatch(combined, /psicoterapeuta in formazione/i);
});

test('the preliminary contact is presented as information rather than a promotion', () => {
  const combined = htmlFiles.map(read).join('\n');
  assert.doesNotMatch(combined, /primo colloquio conoscitivo (?:è )?gratuito/i);
  assert.match(read('index.html'), /contatto preliminare informativo/i);
});

test('light-theme secondary colors meet WCAG AA contrast on their backgrounds', () => {
  const css = read('assets/css/styles.css');
  const variables = Object.fromEntries(
    [...css.matchAll(/--(sage|amber|amber-deep|paper|paper-2):\s*(#[0-9A-F]{6})/gi)]
      .map((match) => [match[1].toLowerCase(), match[2]])
  );
  assert.ok(contrast(variables.sage, variables.paper) >= 4.5);
  assert.ok(contrast(variables.amber, variables.paper) >= 4.5);
  assert.ok(contrast(variables['amber-deep'], variables['paper-2']) >= 4.5);
});

test('competence page preserves a logical heading hierarchy', () => {
  const html = read('competenze.html');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const headingLevels = [...main.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  for (let index = 1; index < headingLevels.length; index += 1) {
    assert.ok(
      headingLevels[index] <= headingLevels[index - 1] + 1,
      `heading jumps from h${headingLevels[index - 1]} to h${headingLevels[index]}`
    );
  }
});

test('competence page places verifiable essentials directly after the hero', () => {
  const html = read('competenze.html');
  const heroEnd = html.indexOf('</section>', html.indexOf('<section class="subhero"'));
  const stripStart = html.indexOf('<section class="credentials-strip"', heroEnd);
  const authorityStart = html.indexOf('<section class="authority', heroEnd);
  assert.ok(stripStart > heroEnd && stripStart < authorityStart, 'credentials strip must follow the hero');
  const stripEnd = html.indexOf('</section>', stripStart);
  const strip = html.slice(stripStart, stripEnd);
  for (const term of ['Psicologa', 'Ordine degli Psicologi della Regione Siciliana', 'Sezione A', '12014', 'Psicologia clinica']) {
    assert.match(strip, new RegExp(term, 'i'), `credentials strip is missing ${term}`);
  }
  assert.match(strip, /href="https:\/\/www\.oprs\.it\/albo\/"/i);
});

test('competence cards keep breathing room below the credentials strip', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.credentials-strip\s*\+\s*\.authority\.section--flush-top\s*\{[^}]*padding-top:\s*var\(--internal-section-compact\)/is);
});

test('competence page uses four user-oriented credential cards', () => {
  const html = read('competenze.html');
  const authority = html.match(/<section class="authority[^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(authority);
  const titles = [...authority[1].matchAll(/<div class="auth-card[^"]*"[\s\S]*?<h3>[\s\S]*?<\/svg>([^<]+)<\/h3>/gi)]
    .map((match) => match[1].trim());
  assert.deepEqual(titles, [
    'Identità professionale',
    'Formazione universitaria',
    'Specializzazione in psicoterapia',
    'Psicologia giuridica e forense'
  ]);
});

test('small navigation links receive a minimum touch area', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.breadcrumb a\s*\{[^}]*min-height:\s*44px/is);
  assert.match(css, /\.footer ul a\s*\{[^}]*min-height:\s*44px/is);
});

test('contact form controls can shrink inside a phone viewport', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.field\s*\{[^}]*min-width:\s*0/is);
  assert.match(css, /\.field input,\s*\.field textarea,\s*\.field select\s*\{[^}]*width:\s*100%/is);
});

test('verified professional credentials are consistent across public pages', () => {
  const combined = htmlFiles.map(read).join('\n');
  assert.doesNotMatch(combined, /Albo Psicologi \[regione\] n\. \[•••\]/i);
  assert.match(read('index.html'), /Regione Siciliana · Sezione A · n\. 12014/i);
  assert.match(read('competenze.html'), /Scuola di Specializzazione in Psicoterapia Cognitiva ALETEIA/i);
  assert.match(read('competenze.html'), /Master universitario di II livello · Università eCampus/i);
  assert.match(read('competenze.html'), /Laurea magistrale in Psicologia Clinica \(LM-51\)/i);
  assert.match(read('competenze.html'), /Laurea triennale in Scienze e Tecniche Psicologiche \(L-24\)/i);
  assert.match(read('competenze.html'), /titolo conseguito/i);
  assert.doesNotMatch(read('index.html') + read('competenze.html'), /\[Università\]|stato\/anno da confermare/i);
  assert.doesNotMatch(read('psicologia-forense.html'), /Mi occupo di consulenze tecniche di parte/i);
});

test('home credentials match the publication-state competence page', () => {
  const home = read('index.html');
  assert.match(home, /Master universitario di II livello[\s\S]{0,350}Università eCampus[\s\S]{0,180}titolo conseguito/i);
  assert.match(home, /Scuola ALETEIA[\s\S]{0,220}percorso in corso dal 2025/i);
  assert.doesNotMatch(home, /discussione finale prevista|7 settembre 2026|Master[^<]{0,120}in corso/i);
  assert.doesNotMatch(home, /psicoterapeuta/i);
});

test('home hero uses precise copy and compact responsive spacing', () => {
  const html = read('index.html');
  const css = read('assets/css/styles.css');
  assert.match(html, /Uno studio a Caltanissetta dedicato all'ascolto e alla comprensione\. Percorsi psicologici per la persona e consulenze per l'ambito giuridico\./i);
  assert.doesNotMatch(html, /Percorsi di cura/i);
  assert.match(css, /\.hero__content\s*\{[^}]*padding-top:\s*clamp\([^}]*padding-bottom:\s*clamp\(/is);
  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero__lede\s*\{[^}]*margin-bottom:\s*var\(--sp-3\)/is);
});

test('home presents two principal paths while preserving three destinations', () => {
  const html = read('index.html');
  assert.match(html, /<header class="ambiti__intro[^"]*"[\s\S]*?<h2[^>]*>Due percorsi, un orientamento chiaro<\/h2>/i);
  assert.equal((html.match(/<article class="[^"]*\bambito\b[^"]*"/g) || []).length, 3);
  assert.match(html, /class="[^"]*ambito--clinical[^"]*"/i);
  assert.match(html, /class="[^"]*ambito--continuing[^"]*"/i);
  assert.match(html, /class="[^"]*ambito--forensic[^"]*"/i);
  for (const href of ['psicologia-clinica.html', 'psicoterapia.html', 'psicologia-forense.html']) {
    assert.match(html, new RegExp(`href="${href.replace('.', '\\.')}"`, 'i'));
  }
});

test('mobile actions share one compact safe-area bar', () => {
  const js = read('assets/js/main.js');
  const css = read('assets/css/styles.css');
  assert.match(js, /primary\.textContent\s*=\s*'Primo contatto'/i);
  assert.match(js, /className\s*=\s*'mobile-cta__whatsapp'/i);
  assert.match(js, /bar\.appendChild\(whatsapp\)/i);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*?\.mobile-cta\s*\{[^}]*display:\s*flex/is);
  assert.match(css, /\.mobile-cta\s*\{[^}]*box-sizing:\s*border-box/is);
  assert.match(css, /env\(safe-area-inset-bottom\)/i);
  assert.match(css, /\.mobile-cta__primary[^}]*box-sizing:\s*border-box[^}]*flex:\s*1\s+1\s+auto[^}]*min-width:\s*0[^}]*min-height:\s*44px/is);
  assert.match(css, /\.mobile-cta__whatsapp[^}]*width:\s*48px[^}]*height:\s*48px/is);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*?\.whatsapp-float\s*\{[^}]*display:\s*none/is);
});

test('competence credentials distinguish completed titles from ongoing specialization', () => {
  const html = read('competenze.html');
  assert.match(html, /LM-51[\s\S]{0,400}Università degli Studi di Urbino Carlo Bo[\s\S]{0,100}2018–2022/i);
  assert.match(html, /L-24[\s\S]{0,400}Università degli Studi Niccolò Cusano[\s\S]{0,100}2015–2018/i);
  assert.match(html, /ALETHEIA|ALETEIA/i);
  assert.match(html, /percorso in corso dal 2025/i);
  assert.match(html, /cognitivista, costruttivista e complesso/i);
  assert.match(html, /Master universitario di II livello[\s\S]{0,500}titolo conseguito/i);
  assert.doesNotMatch(html, /secondo anno|discussione finale prevista|Master[^<]{0,100}in corso|psicoterapeuta/i);
  assert.doesNotMatch(html, /Iscritta all'Albo (?:CTU|dei Periti)/i);
});

test('competence credentials link to their institutional sources', () => {
  const html = read('competenze.html');
  for (const href of [
    'https://www.oprs.it/albo/',
    'https://www.uniurb.it/',
    'https://roma.unicusano.it/',
    'https://www.aleteia.it/wb/',
    'https://www.uniecampus.it/master/master-primo-e-secondo-livello/criminologia-psicologia-giuridica-e-forense'
  ]) {
    const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(html, new RegExp(`<a[^>]*href="${escaped}"[^>]*target="_blank"[^>]*rel="noopener"`, 'i'));
  }
  assert.match(html, /href="psicologia-forense\.html"/i);
});

test('operational information is cautious and includes an emergency boundary', () => {
  const combined = htmlFiles.map(read).join('\n');
  const operations = read('percorso-modalita.html');
  assert.doesNotMatch(combined, /Tariffe agevolate|stessa efficacia|Entrambe le modalità sono efficaci/i);
  assert.match(operations, /non (?:è|costituisce) un servizio di emergenza/i);
  assert.match(operations, /circa 50 minuti/i);
  assert.match(operations, /adulti, adolescenti, coppie, genitori e famiglie/i);
  assert.match(operations, /entro 24 ore/i);
  assert.match(operations, /almeno 3 giorni/i);
  assert.match(operations, /online in tutta Italia/i);
  assert.match(operations, /consenso di entrambi i genitori/i);
  assert.match(read('psicoterapia.html'), /Compenso, frequenza e modalità/i);
  assert.doesNotMatch(read('index.html'), /class="booking__facts/);
  assert.match(read('index.html'), /href="percorso-modalita\.html#incontri"/i);
  assert.doesNotMatch(read('index.html'), /<section class="percorso"/i);
  assert.match(operations, /id="percorso"/i);
  assert.match(operations, /Prosecuzione e verifica/i);
});

test('operations cards reuse the established competence-card title hierarchy', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.operation-card h2\s*\{[^}]*font-size:\s*var\(--step--1\)[^}]*text-transform:\s*uppercase[^}]*color:\s*var\(--amber-deep\)/is);
  assert.match(css, /\.operation-card\s*\{[^}]*padding:\s*var\(--sp-4\)\s+var\(--sp-5\)/is);
});

test('card families share surfaces while preserving their distinct roles', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.card,\s*\.situation,\s*\.step,\s*\.res-card,\s*\.auth-card,\s*\.operation-card\s*\{[^}]*border:\s*1px solid var\(--border\)[^}]*border-radius:\s*var\(--radius\)/is);
});

test('article cards preserve an editorial title hierarchy', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.card__h\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-size:\s*var\(--step-1\)[^}]*color:\s*var\(--text\)/is);
  assert.doesNotMatch(css, /\.card__h\s*\{[^}]*text-transform:\s*uppercase/is);
});

test('article archive publishes only real-content states', () => {
  const html = read('articoli.html');
  for (const demoTitle of [
    "Quando l'ansia diventa una bussola",
    "L'ascolto del minore nei percorsi giudiziari",
    'Iniziare una terapia: cosa aspettarsi davvero',
    'Dipendenza affettiva: riconoscerla, uscirne',
    'CTP: a cosa serve il consulente di parte',
    'Il lutto: attraversarlo senza fretta',
  ]) {
    assert.doesNotMatch(html, new RegExp(demoTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.match(html, /Contenuti in preparazione/i);
  assert.match(html, /class="editorial-areas"/i);
  const editorialAreas = [...html.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/gi)]
    .filter((match) => (attributeValue(match[1], 'class') || '').split(/\s+/).includes('editorial-area'));
  assert.equal(editorialAreas.length, 2);
  const areaTitles = editorialAreas.map((area) => {
    const heading = area[2].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i);
    assert.ok(heading, 'each editorial area must contain its own h3');
    return heading[1].replace(/<[^>]+>/g, '').trim();
  });
  assert.deepEqual(areaTitles, ['Psicologia clinica', 'Psicologia giuridica e forense']);
});

test('reveal animations keep content visible without JavaScript', () => {
  const css = read('assets/css/styles.css');
  const js = read('assets/js/main.js');
  assert.match(css, /\.reveal,\s*\.blur-in\s*\{[^}]*opacity:\s*1[^}]*transform:\s*none[^}]*filter:\s*none/is);
  assert.match(css, /html\.motion-ready \.reveal\s*\{[^}]*opacity:\s*0/is);
  assert.match(css, /html\.motion-ready \.blur-in\s*\{[^}]*opacity:\s*0/is);
  assert.match(js, /document\.documentElement\.classList\.add\(['"]motion-ready['"]\)/);
});

test('article archive declares its editorial method and separates resources', () => {
  const html = read('articoli.html');
  const editorialPolicy = html.match(/<section class="editorial-policy"[^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(editorialPolicy, 'article archive is missing its editorial policy section');
  const policy = editorialPolicy[1];
  for (const criterion of ['firma', 'data di pubblicazione', 'fonti', 'ultima revisione']) {
    assert.match(policy, new RegExp(criterion, 'i'));
  }
  assert.match(policy, /articoli[^<]*(?:lettura|approfondimenti)/i);
  assert.match(policy, /href="risorse\.html"/i);
  assert.match(policy, /materiali scaricabili/i);
});

test('article template exposes a complete semantic publishing structure', () => {
  const html = read('articolo-modello.html');
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Pagina modello/i);
  for (const field of ['Autrice', 'Pubblicazione', 'Ultima revisione', 'Tempo di lettura']) {
    assert.match(html, new RegExp(field, 'i'));
  }
  assert.match(html, /aria-label="Indice dell'articolo"/i);
  assert.match(html, /id="fonti"/i);
  assert.match(html, /non sostituisce una valutazione professionale/i);
  assert.match(html, /Dott\.ssa Sharon Maria Bellia/i);
  assert.match(html, /href="articoli\.html"/i);
});

test('public pages do not link the article template', () => {
  for (const file of htmlFiles.filter((name) => name !== 'articolo-modello.html')) {
    for (const { href } of anchorHrefs(read(file))) {
      if (href !== null && normalizedLocalPath(href, file) === '/articolo-modello.html') {
        assert.fail(`${file} publishes the template through ${href}`);
      }
    }
  }
});

test('public HTML has unique IDs and links with real destinations', () => {
  for (const file of htmlFiles) {
    const html = read(file);
    const ids = [...html.matchAll(/<[a-z][^>]*\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))[^>]*>/gi)]
      .map((match) => match[1] ?? match[2] ?? match[3]);
    assert.equal(ids.length, new Set(ids).size, `${file} contains duplicate IDs`);

    for (const { tag, href } of anchorHrefs(html)) {
      assert.notEqual(href, null, `${file} contains an anchor without href: ${tag}`);
      const destination = href.trim();
      assert.ok(
        destination && destination !== '#' && !/^javascript:/i.test(destination),
        `${file} contains a link without a real destination: ${tag}`
      );
    }
  }
});

test('article archive preserves a logical heading hierarchy throughout the document', () => {
  const headingLevels = [...read('articoli.html').matchAll(/<h([1-6])\b/gi)]
    .map((match) => Number(match[1]));
  for (let index = 1; index < headingLevels.length; index += 1) {
    assert.ok(
      headingLevels[index] <= headingLevels[index - 1] + 1,
      `heading jumps from h${headingLevels[index - 1]} to h${headingLevels[index]}`
    );
  }
});

test('process cards preserve roman numerals and display titles', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.step__num\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-style:\s*italic/is);
  assert.match(css, /\.step__title\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-size:\s*var\(--step-1\)/is);
});

test('informational cards share the competence-card title treatment', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /\.situation h3,\s*\.res-card \.card__h,\s*\.auth-card h3,\s*\.operation-card h2\s*\{[^}]*font-size:\s*var\(--step--1\)[^}]*text-transform:\s*uppercase[^}]*color:\s*var\(--amber-deep\)/is);
});

test('primary navigation stays focused while secondary destinations remain available', () => {
  const expectedLabels = ['Chi sono', 'Ambiti', 'Percorso', 'Competenze', 'Articoli', 'Contatti'];
  for (const file of htmlFiles) {
    const html = read(file);
    const nav = html.match(/<ul class="nav__list"[^>]*>([\s\S]*?)<\/ul>/i);
    assert.ok(nav, `${file} is missing the primary navigation`);
    const labels = [...nav[1].matchAll(/<a\b[^>]*>([^<]+)<\/a>/gi)]
      .map((match) => match[1].trim());
    assert.deepEqual(labels, expectedLabels, `${file} has an unexpected primary navigation`);

    const footer = html.slice(html.indexOf('<footer'));
    assert.match(footer, /href="risorse\.html"/i, `${file} footer is missing Risorse`);
    assert.match(footer, /href="(?:index\.html)?#faq"/i, `${file} footer is missing FAQ`);
  }
});

test('the journey page offers a working internal index', () => {
  const html = read('percorso-modalita.html');
  const index = html.match(/<nav class="page-index" aria-label="In questa pagina">([\s\S]*?)<\/nav>/i);
  assert.ok(index, 'Percorso e modalità is missing its internal index');
  const targets = ['percorso', 'destinatari', 'incontri', 'online', 'adolescenti', 'spostamenti', 'urgenze'];
  for (const target of targets) {
    assert.match(index[1], new RegExp(`href="#${target}"`, 'i'), `index is missing #${target}`);
    assert.equal(
      [...html.matchAll(new RegExp(`\\bid="${target}"`, 'gi'))].length,
      1,
      `#${target} must identify exactly one destination`
    );
  }
});

test('forensic pages use stable professional language without temporary notices', () => {
  const home = read('index.html');
  const forensicStart = home.indexOf('id="forense"');
  const forensicEnd = home.indexOf('</section>', forensicStart);
  const forensicCopy = home.slice(forensicStart, forensicEnd) + read('psicologia-forense.html');
  assert.doesNotMatch(
    forensicCopy,
    /formazione in quest'area è in corso|non dichiaro incarichi CTP|sto completando un Master|informazioni preliminari/i
  );
  assert.match(forensicCopy, /CTU[^<]*(?:giudice|autorità giudiziaria)/i);
  assert.match(forensicCopy, /CTP[^<]*(?:parte|avvocato)/i);
});

test('the forensic page distinguishes audiences and professional roles', () => {
  const html = read('psicologia-forense.html');
  for (const label of [
    'Privati e famiglie',
    'Avvocati',
    'Autorità giudiziaria',
    'CTU in ambito civile',
    'Perito in ambito penale',
    'Consulenza Tecnica di Parte (CTP)',
    'Valutazioni e relazioni extragiudiziali'
  ]) {
    assert.match(html, new RegExp(label.replace(/[()]/g, '\\$&'), 'i'), `missing ${label}`);
  }
  assert.match(html, /CTU in ambito civile[\s\S]{0,600}nomina dell'autorità giudiziaria/i);
  assert.match(html, /Perito in ambito penale[\s\S]{0,600}nomina dell'autorità giudiziaria/i);
});

test('civil, criminal, and family forensic areas receive equal structure', () => {
  const html = read('psicologia-forense.html');
  const section = html.match(/<section[^>]*id="ambiti-forensi"[^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(section, 'missing forensic areas section');
  assert.equal([...section[1].matchAll(/class="forensic-area\b/gi)].length, 3);
  for (const term of [
    'Ambito civile',
    'Ambito penale',
    'Famiglia e minori',
    'capacità genitoriali',
    'consulenza tecnica di parte',
    'valutazioni psicologiche pertinenti al quesito',
    'tutela del minore'
  ]) {
    assert.match(section[1], new RegExp(term, 'i'), `forensic areas are missing ${term}`);
  }
});

test('the forensic workflow presents six ordered phases', () => {
  const html = read('psicologia-forense.html');
  const section = html.match(/<section[^>]*id="processo-forense"[^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(section, 'missing forensic workflow');
  const expected = [
    ['i', 'Analisi preliminare'],
    ['ii', 'Mandato e quesito'],
    ['iii', 'Documentazione e attività valutative'],
    ['iv', 'Elaborazione tecnica'],
    ['v', 'Relazione e restituzione'],
    ['vi', 'Attività processuali']
  ];
  const cards = [...section[1].matchAll(/<div class="step[^"]*"[\s\S]*?<div class="step__num">([^<]+)<\/div>[\s\S]*?<h3 class="step__title">([^<]+)<\/h3>/gi)]
    .map((match) => [match[1].trim(), match[2].trim()]);
  assert.deepEqual(cards, expected);
});

test('the forensic page states the boundaries of the professional role', () => {
  const html = read('psicologia-forense.html');
  const section = html.match(/<section[^>]*id="confini-forensi"[^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(section, 'missing forensic boundaries section');
  for (const term of [
    'mandato',
    'quesito',
    'non coincide con un percorso clinico',
    'chiarezza del ruolo',
    'dati disponibili',
    'riservatezza',
    "non accettazione dell'incarico"
  ]) {
    assert.match(section[1], new RegExp(term, 'i'), `forensic boundaries are missing ${term}`);
  }
});

test('the forensic FAQ and CTA guide only appropriate direct requests', () => {
  const html = read('psicologia-forense.html');
  const faq = html.match(/<section class="faq"[^>]*id="faq"[^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(faq, 'missing forensic FAQ');
  assert.equal([...faq[1].matchAll(/<details class="faq__item" name="faq-forense">/gi)].length, 8);
  for (const question of [
    'differenza tra CTU, perito e CTP',
    'Un privato può richiedere direttamente una CTU o una perizia',
    'Quando può essere utile una consulenza tecnica di parte',
    'Quali documenti servono per il primo confronto',
    'Una valutazione forense è un percorso clinico',
    'È possibile richiedere una relazione psicologica',
    'può svolgersi interamente online',
    'Come vengono definiti tempi e compenso'
  ]) {
    assert.match(faq[1], new RegExp(question, 'i'), `FAQ is missing ${question}`);
  }
  assert.match(html, /Richiedi una valutazione preliminare del quesito/i);
  assert.doesNotMatch(html, /prenota (?:una )?(?:CTU|perizia)/i);
});

test('the WordPress handoff checklist covers every deferred publication task', () => {
  const readme = read('README.md');
  for (const topic of ['form e recapiti', 'privacy', 'cookie', 'articoli', 'download', 'fotografie', 'SEO', 'contenuti forensi']) {
    assert.match(readme, new RegExp(topic, 'i'), `WordPress checklist is missing ${topic}`);
  }
});

test('the WordPress checklist defers judicial credentials until verification', () => {
  const readme = read('README.md');
  for (const topic of [
    'Master conseguito',
    'Albo CTU del Tribunale di Caltanissetta',
    'Albo Periti del Tribunale di Caltanissetta',
    'dati strutturati'
  ]) {
    assert.match(readme, new RegExp(topic, 'i'), `WordPress checklist is missing ${topic}`);
  }
});

test('public HTML uses reusable classes instead of inline styles', () => {
  for (const file of htmlFiles) {
    assert.doesNotMatch(read(file), /\sstyle=/i, `${file} contains an inline style`);
  }
});

test('the journey page index is reserved for desktop widths above 1200px', () => {
  const css = read('assets/css/styles.css');
  assert.match(
    css,
    /@media\s*\(max-width:\s*1200px\)[\s\S]*?\.page-index\s*\{[^}]*display:\s*none/is
  );
});

test('the public site exposes only the selected light theme', () => {
  const combinedHtml = htmlFiles.map(read).join('\n');
  const css = read('assets/css/styles.css');
  const js = read('assets/js/main.js');
  assert.doesNotMatch(combinedHtml, /class="theme-toggle"|prefers-color-scheme:\s*dark/i);
  assert.doesNotMatch(css, /\[data-theme="dark"\]|color-scheme:\s*dark/i);
  assert.doesNotMatch(js, /themeToggle|applyTheme|prefers-color-scheme|localStorage\.(?:getItem|setItem)\(['"]theme/i);
  assert.match(css, /color-scheme:\s*light/i);
});

test('every public footer exposes Esplora and Ambiti as native mobile disclosures', () => {
  const footerFiles = htmlFiles.filter((file) => /<footer class="footer">/i.test(read(file)));
  for (const file of footerFiles) {
    const footer = read(file).match(/<footer class="footer">([\s\S]*?)<\/footer>/i)?.[1] || '';
    assert.equal(
      (footer.match(/<details class="footer__menu" open>/gi) || []).length,
      2,
      `${file} must contain two progressively enhanced footer disclosures`
    );
    assert.match(footer, /<summary class="footer__menu-title">Esplora<\/summary>/i, `${file} misses Esplora`);
    assert.match(footer, /<summary class="footer__menu-title">Ambiti<\/summary>/i, `${file} misses Ambiti`);
  }
});

test('footer disclosures keep desktop columns and accessible mobile controls', () => {
  const css = read('assets/css/styles.css');
  const js = read('assets/js/main.js');
  assert.match(css, /\.footer__menu\s*>\s*summary\s*\{[^}]*list-style:\s*none/is);
  assert.match(css, /@media\s*\(min-width:\s*901px\)[\s\S]*?\.footer__menu-title\s*\{[^}]*pointer-events:\s*none/is);
  assert.match(css, /@media\s*\(max-width:\s*900px\)[\s\S]*?\.footer__menu-title\s*\{[^}]*min-height:\s*44px/is);
  assert.match(js, /matchMedia\(['"]\(max-width:\s*900px\)['"]\)/i);
  assert.match(js, /menu\.open\s*=\s*!footerMobile\.matches/i);
  assert.match(js, /footerMobile\.addEventListener\(['"]change['"]/i);
});

test('the home form is followed by understated non-clickable facsimile contacts', () => {
  const html = read('index.html');
  const formEnd = html.indexOf('</form>');
  const contactsStart = html.indexOf('<aside class="contact-details', formEnd);
  assert.ok(formEnd >= 0 && contactsStart > formEnd, 'contact details must follow the form');
  const contacts = html.slice(contactsStart, html.indexOf('</aside>', contactsStart));
  for (const value of [
    'studio@studiosharonbellia.example',
    '+39 000 000 0000',
    'Caltanissetta · Via Esempio 00',
    'Online in tutta Italia'
  ]) {
    assert.match(contacts, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.doesNotMatch(contacts, /href="(?:mailto:|tel:|https:\/\/wa\.me)/i);
});

test('all non-home pages use the shared internal-page rhythm hook', () => {
  for (const file of htmlFiles.filter((name) => name !== 'index.html')) {
    assert.match(read(file), /<main\b[^>]*class="[^"]*\binternal-page\b[^"]*"/i, `${file} lacks internal-page`);
  }
  assert.doesNotMatch(read('index.html'), /<main\b[^>]*class="[^"]*\binternal-page\b/i);
});

test('public pages use one coherent and documented facsimile contact set', () => {
  const publicFiles = htmlFiles.filter((file) => file !== 'articolo-modello.html');
  const combined = publicFiles.map(read).join('\n');
  for (const placeholder of [
    '[dominio]',
    '[indirizzo]',
    '[numero]',
    '[email professionale]',
    '[numero professionale]',
    'P.IVA [•••]',
    'PLACEHOLDER'
  ]) {
    assert.ok(!combined.includes(placeholder), `Segnaposto pubblico ancora presente: ${placeholder}`);
  }

  const location = read('dove-trovarmi.html');
  for (const value of [
    'studio@studiosharonbellia.example',
    '+39 000 000 0000',
    'Via Esempio 00'
  ]) {
    assert.ok(location.includes(value), `Dato facsimile mancante in Dove trovarmi: ${value}`);
  }

  assert.match(read('assets/js/main.js'), /WHATSAPP_NUMBER\s*=\s*['"]390000000000['"]/);
  assert.match(read('README.md'), /dati facsimile/i);
  assert.ok(read('README.md').includes('studiosharonbellia.example'));
  assert.match(read('README.md'), /sostituirli prima della pubblicazione/i);
});

test('internal sections share desktop and mobile spacing tokens', () => {
  const css = read('assets/css/styles.css');
  assert.match(
    css,
    /\.internal-page\s*\{[^}]*--internal-section-space:\s*clamp\(var\(--sp-5\),\s*7vw,\s*var\(--sp-7\)\)/is
  );
  assert.match(
    css,
    /\.internal-page\s*>\s*:is\([^)]*\)\s*\{[^}]*padding-block:\s*var\(--internal-section-space\)/is
  );
  assert.match(
    css,
    /\.internal-page\s*>\s*\.subhero\s*\{[^}]*padding-bottom:\s*var\(--internal-section-space\)/is
  );
});

test('journey grids use tablet-safe breakpoints without horizontal overflow', () => {
  const css = read('assets/css/styles.css');
  assert.match(css, /@media\s*\(min-width:\s*600px\)\s*\{[^}]*\.steps\s*\{[^}]*repeat\(2,\s*minmax\(0,\s*1fr\)\)/is);
  assert.match(css, /@media\s*\(min-width:\s*1040px\)\s*\{[^}]*\.steps\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)/is);
  assert.doesNotMatch(css, /@media\s*\(min-width:\s*760px\)\s*\{\s*\.steps\s*\{[^}]*repeat\(4/is);
  assert.match(css, /@media\s*\(max-width:\s*900px\)[\s\S]*?\.operations__grid\s*\{[^}]*grid-template-columns:\s*1fr/is);
});

test('responsive navigation styles do not wait for remote web fonts', () => {
  for (const file of htmlFiles) {
    const html = read(file);
    const localStyles = html.indexOf('href="assets/css/styles.css"');
    const remoteFonts = html.indexOf('href="https://fonts.googleapis.com/css2');

    assert.ok(localStyles >= 0, `${file} misses the local stylesheet`);
    assert.ok(remoteFonts > localStyles, `${file} must load structural CSS before remote fonts`);

    const fontLink = html.slice(html.lastIndexOf('<link', remoteFonts), html.indexOf('/>', remoteFonts) + 2);
    assert.match(fontLink, /media="print"/i, `${file} remote fonts must be non-render-blocking`);
    assert.match(fontLink, /onload="this\.media='all'"/i, `${file} must activate fonts after loading`);
    assert.match(html, /<noscript>\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2/i);
  }
});

test('preloader preserves its identity without adding a fixed post-load delay', () => {
  const js = read('assets/js/main.js');
  assert.match(js, /PRELOADER_MIN_MS\s*=\s*250/);
  assert.match(js, /PRELOADER_MAX_MS\s*=\s*2500/);
  assert.match(js, /Math\.max\(0,\s*PRELOADER_MIN_MS\s*-\s*elapsed\)/);
  assert.doesNotMatch(js, /setTimeout\(hidePreloader,\s*500\)/);
});

test('landscape animation runs only while useful', () => {
  const js = read('assets/js/main.js');
  const css = read('assets/css/styles.css');
  assert.match(js, /var landscapeFrameId = null/);
  assert.match(js, /cancelAnimationFrame\(landscapeFrameId\)/);
  assert.match(js, /document\.addEventListener\('visibilitychange'/);
  assert.match(js, /new IntersectionObserver/);
  assert.match(js, /innerWidth <= 1200 \? 33 : 0/);
  assert.match(css, /html\.page-hidden [^{]+\{[^}]*animation-play-state:\s*paused/is);
});

test('interactive controls expose complete accessible HTML and visible focus', () => {
  for (const file of htmlFiles) {
    const html = read(file);
    const toggles = html.match(/<button\b[^>]*class="nav__toggle"[^>]*>/gi) || [];
    assert.equal(toggles.length, 1, `${file} must contain one navigation toggle`);
    assert.match(toggles[0], /\btype="button"/i, `${file} navigation toggle needs type=button`);
  }

  const home = read('index.html');
  assert.match(home, /<textarea\b[^>]*id="messaggio"[^>]*aria-describedby="messaggio-hint"/i);
  assert.match(home, /<span\b[^>]*id="messaggio-hint"[^>]*class="field__hint"/i);

  const css = read('assets/css/styles.css');
  for (const surface of ['ambito--dark', 'quote', 'detail--dark', 'cta-band', 'footer']) {
    assert.match(css, new RegExp(`\\.${surface}[^,{]*:focus-visible`, 'i'));
  }
  assert.match(css, /#F3F4EF/i);
});

test('mobile navigation manages and contains keyboard focus', () => {
  const js = read('assets/js/main.js');
  assert.match(js, /function setNavOpen\(open,\s*restoreFocus\)/);
  assert.match(js, /matchMedia\('\(max-width:\s*1200px\)'\)/);
  assert.match(js, /navList\.querySelector\('a\[href\]'\)/);
  assert.match(js, /firstLink\.focus\(\)/);
  assert.match(js, /e\.key === 'Tab'/);
  assert.match(js, /e\.shiftKey/);
  assert.match(js, /e\.preventDefault\(\)/);
  assert.match(js, /setNavOpen\(false,\s*true\)/);
  assert.match(js, /toggle\.focus\(\)/);
});

test('form validation exposes and clears invalid state for assistive technology', () => {
  const js = read('assets/js/main.js');
  assert.match(js, /function markInvalidFields\(\)/);
  assert.match(js, /querySelectorAll\(':invalid'\)/);
  assert.match(js, /setAttribute\('aria-invalid',\s*'true'\)/);
  assert.match(js, /function clearFieldError\(e\)/);
  assert.match(js, /e\.target\.checkValidity\(\)/);
  assert.match(js, /removeAttribute\('aria-invalid'\)/);
  assert.match(js, /form\.addEventListener\('input',\s*clearFieldError\)/);
  assert.match(js, /form\.addEventListener\('change',\s*clearFieldError\)/);
});

test('tablet navigation animates opening but closes before backdrop blur returns', () => {
  const css = read('assets/css/styles.css');
  const tabletNav = css.match(/@media\s*\(max-width:\s*1200px\)\s*\{([\s\S]*?)\n\}/i)?.[1] || '';
  assert.match(tabletNav, /\.nav__list\s*\{[\s\S]*?transition:\s*none/is);
  assert.match(
    tabletNav,
    /body\.nav-open\s+\.nav__list\s*\{[^}]*transition:\s*opacity\s+\.28s\s+var\(--ease\)/is
  );
  assert.doesNotMatch(tabletNav, /visibility\s+\.4s/i);
});
