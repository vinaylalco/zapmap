module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '~/assets': './assets',
            '~/components': './contexts',
            '~/screens': './screens',
            '~/api': './api',
            '~/features': './features',
            '~/utils': './src/utils',
            '~/wrappers': './wrappers'
          },
        },
      ],
    ],
  };
};