const { execSync } = require("child_process");

// Real last-commit date for a source file (YYYY-MM-DD, git's committer-date
// short format) — used so sitemap.xml's <lastmod> stays accurate on every
// build instead of being a value someone has to remember to hand-edit.
// Falls back to today when git has no history for the file yet (e.g. it's
// staged but not committed) rather than failing the build.
function gitLastMod(filePath) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${filePath}"`, {
      cwd: __dirname,
    })
      .toString()
      .trim();
    if (out) return out;
  } catch (e) {
    // no git history / not a git checkout — fall through to today's date
  }
  return new Date().toISOString().slice(0, 10);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/google1f4511110697fd18.html");
  // Plain-text verification file, not an HTML template — passthrough only.
  eleventyConfig.ignores.add("src/google1f4511110697fd18.html");
  // Cloudflare reads these from the deploy output root, same convention as
  // Netlify — passthrough only, not templates.
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/_headers");

  eleventyConfig.addFilter("gitLastMod", gitLastMod);

  // Keep the site's existing flat URL structure (/pricing.html, not
  // /pricing/) instead of Eleventy's default pretty-URL folder output.
  // sitemap.njk is the one exception — it needs to output as sitemap.xml,
  // not sitemap.xml.html.
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) =>
      data.page.filePathStem === "/sitemap"
        ? "/sitemap.xml"
        : `${data.page.filePathStem}.html`,
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
