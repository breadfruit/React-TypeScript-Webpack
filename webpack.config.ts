
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                include: [path.resolve(__dirname, '/src')],
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, './src')],
                exclude: ['/node_modules/'],
                use: ["style-loader", "css-loader"],
            },
        ]
    }
};