const path = require('path')

module.exports = {

    entry: ['./src/scripts/index.jsx'],

    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            { // scripts
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                resolve: {extensions: ['.js', '.jsx']},
                use: {
                    loader: 'babel-loader'
                }
            },
            { // styles
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },

    devServer: {
        port: 6060,
        publicPath: '/scripts/',    // index.html imports script as src='scripts/bundle.js'
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true, // for using BrowserRouter
        proxy: {
            '/server': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/server': ''}
            }
        }
    },

    devtool: 'source-map',
    mode: 'development'
}
