// Eleventy 3.x — configurazione
export default function (eleventyConfig) {
  // Copia asset e file statici così come sono
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  // Pannello Decap CMS
  eleventyConfig.addPassthroughCopy("admin");

  // Non processare i README dentro assets come pagine
  eleventyConfig.ignores.add("src/assets/**/*.md");

  // Data in italiano (es. 30 luglio 2026)
  eleventyConfig.addFilter("dateIt", (d) =>
    new Date(d).toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" })
  );

  // Data cascade: i file in src/_data sono disponibili in tutti i template.
  // Collezione "articoli" (Markdown in src/articoli), ordinati per data discendente.
  eleventyConfig.addCollection("articoli", (api) =>
    api.getFilteredByGlob("src/articoli/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
