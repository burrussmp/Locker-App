/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
          alias: {
            screens: './screens',
            components: './components',
            store: './store',
            api: './api',
            styles: './styles',
            assets: './assets',
            containers: './containers',
            tests: './tests',
            common: './common',
          },
        },
      ],
    ],
  };
};
