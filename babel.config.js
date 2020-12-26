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
            navigation: './navigation',
            store: './store',
            api: './api',
            styles: './styles',
            assets: './assets',
            containers: './containers',
            tests: './tests',
          },
        },
      ],
    ],
  };
};
