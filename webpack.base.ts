import path from 'path'
import { Configuration } from 'webpack'
const baseConfig: Configuration = {
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

export default baseConfig