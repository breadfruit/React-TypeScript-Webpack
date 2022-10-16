
import base from "./webpack.base"
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import path from 'path'
import { Configuration } from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'

const clientConfig: Configuration = merge(base, {
    mode: 'development',
    entry: "./src/entry-client.tsx",
    output: {
        ...(process.env.NODE_ENV
            ? {
                publicPath: '/'
            }
            : {}),
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            name: 'test_lib',
            type: 'umd'
        },

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
            publicPath: '/'
        }),
        new MiniCssExtractPlugin(),
        new WebpackManifestPlugin({ fileName: "manifest-client.json" }),
        new CopyPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, './public/images/'),
                        to: path.resolve(__dirname, './dist/images')
                    }
                ]
            }
        )
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
            {
                test: /\.(jpe?g|png|webp)$/i,
                oneOf: [{
                    type: "javascript/auto",
                    resourceQuery: /sizes?/,
                    use: [{
                        loader: "responsive-loader",
                        options: {
                            adapter: require("responsive-loader/sharp"),
                        },
                    }],
                }, {
                    type: "asset/resource",
                }],
            }
        ]
    }
});


export default clientConfig;