const purgecss = require('@fullhuman/postcss-purgecss')({

  content: [
    './**/*.html',
    './**/*.njk',
    './**/*.md',
  ],

  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
  }),
  ...process.env.NODE_ENV === 'production'
    ? [purgecss]
    : []
  ]
}