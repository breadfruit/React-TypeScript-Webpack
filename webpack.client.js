
const base = require("./webpack.base")
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const path = require('path')

module.exports = merge(base, {
    mode: 'development',
    entry: "./src/entry-client.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new MiniCssExtractPlugin(),
        new WebpackManifestPlugin({ fileName: "manifest-client.json" }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === "development" ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 添加 autoprefixer 插件
                                plugins: [require("autoprefixer")],
                            },
                        },
                    }
                ],
                exclude: ['/node_modules/'],
            },
        ]
    }
});
