// eslint-disable-next-line no-undef
export default (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel', 'react-native-reanimated/plugin'],
  };
};
