// import path from 'path';

const path = require("path");
// export default {
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app-ui'),
    output: {
        path: path.resolve(__dirname, 'src','public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts']
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            exclude: /node_module/
        }]
    }
}