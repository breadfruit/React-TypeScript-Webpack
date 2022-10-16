const base = require("./webpack.base")
const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(base, {
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
                loader: path.resolve(__dirname, './my-css-loader.js')
            }
        ]
    }
});

