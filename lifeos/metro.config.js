const { getDefaultConfig } = require("expo/metro-config");
// Expo Router v4+ no longer requires a custom Metro wrapper.
module.exports = getDefaultConfig(__dirname);

