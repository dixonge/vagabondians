const { DateTime } = require("luxon");
const fs = require("fs");
const sanitizeHTML = require('sanitize-html')
const markdownIt = require("markdown-it");
const markdownItAttributes = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {

  	// A responsive image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("picture", require("./js/picture.js"));
  
  const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.setDataDeepMerge(true);

  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.cloudinaryCloudName = 'donblanco';
  eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
  eleventyConfig.fallbackWidth = 640;

  eleventyConfig.addCollection("sidebarNav", function(collection) {
    // everything but news
    return collection.getAll().filter(item => (item.data.tags || []).indexOf("news") === -1);
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter('dateFromTimestamp', timestamp => {
    return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("./*.xml");
  eleventyConfig.addPassthroughCopy("./*.webmanifest");  
  eleventyConfig.addPassthroughCopy("./*.png");
  eleventyConfig.addPassthroughCopy("./*.ico");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItImplicitFigures = require("markdown-it-implicit-figures");
  let markdownItAttributes = require("markdown-it-attrs");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let figopts = {
    dataType: false,  // <figure data-type="image">, default: false
    figcaption: true,  // <figcaption>alternative text</figcaption>, default: false
    tabindex: false, // <figure tabindex="1+n">..., default: false
    link: false // <a href="img.png"><img src="img.png"></a>, default: false
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  let markdownLib = markdownIt(options).use(markdownItImplicitFigures, figopts);
    
    eleventyConfig.setLibrary("md", markdownLib);

    eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };

};