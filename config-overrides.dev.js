const path = require('path');

module.exports = function (config) {
  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"]
  });
}
