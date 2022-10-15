
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
    mode: 'development',
    entry: "./src/index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new MiniCssExtractPlugin(),
        new WebpackManifestPlugin({ fileName: "manifest-client.json" }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        port: 3000,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'css'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: ['/node_modules/'],
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
            },
        ]
    }
};