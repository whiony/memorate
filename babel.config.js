module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@features': './src/features',
            '@ui': './src/ui',
            '@modals': './src/modals',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@utils': './src/utils',
            '@navigation': './src/navigation',
            '@types': './src/types',
            '@theme': './src/theme',
            '@contexts': './src/contexts',
          },
        },
      ],
    ],
  };
};
