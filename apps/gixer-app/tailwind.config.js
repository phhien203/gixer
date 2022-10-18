const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      blue: '#0079FF',
      gray: '#4B6A9B',
      'gray-dark': '#2B3442',
      'gray-light': '#697C9A',
      white: '#FEFEFE',
      darker: '#F6F8FF',
    },
    fontFamily: {
      mono: ['space-mono', 'mono'],
    },
  },
  plugins: [],
};
