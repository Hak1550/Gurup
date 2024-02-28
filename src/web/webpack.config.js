const HtmlWebPackPlugin = require("html-webpack-plugin");
const {EnvironmentPlugin} = require("webpack");
const path = require('path');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    ...(process.env.NODE_ENV === "development" ? {devtool: 'source-map'} : {}),
    devServer: {
        contentBase: './src',
        port: process.env.PORT,
        open: true,
        hot: false,
        inline: false,
        historyApiFallback: true,
        disableHostCheck: true,
        ...(process.env.PUBLIC ? {public: process.env.PUBLIC} : {})
// --open --hot --history-api-fallback --mode development
    },
    resolve: {
        modules: ['node_modules',path.resolve(__dirname, 'node_modules')],
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            components: path.resolve(__dirname, 'src/components/'),
            translations: path.resolve(__dirname,'src/translations'),
            utils: path.resolve(__dirname, '../utils/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            routes: path.resolve(__dirname, 'src/routes/'),
            actions: path.resolve(__dirname, '../actions/'),
            hocs: path.resolve(__dirname, '../hocs/'),
            requester: path.resolve(__dirname, '../requester/'),
            store: path.resolve(__dirname, '../store/'),
            styles: path.resolve(__dirname, 'src/styles/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // include: [
                //     path.resolve(__dirname, "../hocs"),
                //     path.resolve(__dirname, 'src')
                // ],
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        // rootMode: "upward",
                        ignore: [/node_modules/],
                        presets: [
                            require.resolve('@babel/preset-env'),
                            require.resolve('@babel/preset-react'),
                        ],
                        plugins: [
                            '@babel/plugin-proposal-export-default-from',
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime"
                        ]
                    //     babelrcRoots: [
                    //         ".",
                    //         "web/*",
                    //     ],
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new EnvironmentPlugin(['NODE_ENV','PLATFORM_ENV']),
        new Dotenv(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: "index.html",
        })
    ]
};
