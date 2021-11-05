const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, "assets"),
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, "assets/dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer')
                                ]
                            }
                            
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer')
                                ]
                            }
                            
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                          implementation: require("sass"),
                        },
                    },
                ],
              },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin(),
        new FaviconsPlugin({
            logo: 'src/favicon.png',
            cache: true,
            inject: true,
            // outputPath: '/public/static',
            mode: 'auto',
            manifest: './src/manifest.json'
        }),
        new MiniCssExtractPlugin(),
        new ProgressPlugin({
            handler(percentage, message, ...args) {
                console.log(`${(percentage * 100).toFixed()}% ${message}`, ...args);
            }
          })
          
    ]
}