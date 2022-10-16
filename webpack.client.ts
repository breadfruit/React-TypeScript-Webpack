
import base from "./webpack.base"
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import path from 'path'
import { Configuration } from 'webpack'

const clientConfig: Configuration = merge(base, {
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


export default clientConfig;