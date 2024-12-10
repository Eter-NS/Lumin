const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        background: '#191726',
        'ui-background': '#373737',
        text: '#FAEDED',

        'background-light': '#FAEDED',
        'ui-background-light': '#EDE1E1',
        'text-light': '#191726',

        'custom-1': '#e79855',
        'custom-2': '#d6414f',
        'custom-3': '#1848ad',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
