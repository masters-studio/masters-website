// Pages listed in sitemap.xml. `file` is the source path (repo-relative,
// forward slashes) used to look up each page's real last-commit date via
// the gitLastMod filter in .eleventy.js — see sitemap.njk.
module.exports = [
  { loc: "/", file: "src/index.html", changefreq: "weekly", priority: "1.0" },
  { loc: "/pricing.html", file: "src/pricing.html", changefreq: "monthly", priority: "0.9" },
  { loc: "/academy.html", file: "src/academy.html", changefreq: "monthly", priority: "0.9" },
  { loc: "/articles/mah-ze-fade.html", file: "src/articles/mah-ze-fade.html", changefreq: "monthly", priority: "0.8" },
  { loc: "/articles/how-to-choose-cut.html", file: "src/articles/how-to-choose-cut.html", changefreq: "monthly", priority: "0.8" },
  { loc: "/articles/beard-care.html", file: "src/articles/beard-care.html", changefreq: "monthly", priority: "0.7" },
];
