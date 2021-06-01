// const customWebpack = require('./webpack.config.js');
// .storybook/main.js

const path = require("path")
module.exports = {
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)", "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-react-live-edit", "@storybook/preset-scss"],
}
