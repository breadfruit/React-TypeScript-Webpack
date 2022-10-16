import base from "./webpack.base"
import { merge } from 'webpack-merge'
import path from 'path'
import { Configuration } from 'webpack'

const serverConfig: Configuration = merge(base, {
    entry: "./src/server-client.tsx",
    target: 'node',
    output: {
        library: {
            name: 'MyLibrary',
            type: 'commonjs2'
        },
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: path.resolve(__dirname, './my-css-loader.ts')
            }
        ]
    }
});

export default serverConfig;