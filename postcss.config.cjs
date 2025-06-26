module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 3,
      features: {
        "color-functional-notation": false,
        "relative-color-syntax": false,
      },
    },
    autoprefixer: {},
  },
};
