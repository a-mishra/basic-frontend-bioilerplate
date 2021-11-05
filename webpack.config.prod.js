const {merge} = require('webpack-merge');
const common = require('./webpack.config.common');
const OptimiseCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Terserlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode:"production",
    optimization: {
        minimizer: [
            new OptimiseCssAssetsPlugin(),
            new Terserlugin()
        ]
    }
})