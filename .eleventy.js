module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/google1f4511110697fd18.html");
  // Plain-text verification file, not an HTML template — passthrough only.
  eleventyConfig.ignores.add("src/google1f4511110697fd18.html");

  // Keep the site's existing flat URL structure (/pricing.html, not
  // /pricing/) instead of Eleventy's default pretty-URL folder output.
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => `${data.page.filePathStem}.html`,
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
