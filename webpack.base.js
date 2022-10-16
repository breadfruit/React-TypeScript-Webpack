const path = require('path')
module.exports = {
    mode: 'development',
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
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                }
            }
        ]
    }
};
