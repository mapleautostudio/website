const path = require("path");

process.env.EXPO_PROJECT_ROOT =
  process.env.EXPO_PROJECT_ROOT || path.resolve(__dirname);
process.env.EXPO_ROUTER_APP_ROOT =
  process.env.EXPO_ROUTER_APP_ROOT || path.resolve(__dirname, "app");

const {
  expoRouterBabelPlugin,
} = require("babel-preset-expo/build/expo-router-plugin");

module.exports = function (api) {
  api.cache.using(() => process.env.EXPO_ROUTER_APP_ROOT);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [expoRouterBabelPlugin],
  };
};
