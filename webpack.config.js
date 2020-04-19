const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: './src/ui.ts', // The entry point for your UI code
        code: './src/code.ts', // The entry point for your plugin code
    },

    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },

    module: {
        rules: [

            // Converts Vue code to JavaScript
            {test: /\.vue$/, loader: 'vue-loader', exclude: /node_modules/},

            // Converts TypeScript code to JavaScript
            {
                test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },

            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            {
                test: /\.css$/, loader: [
                    {loader: 'vue-style-loader'},
                    {loader: 'css-loader'}
                ]
            },

            //Enables including SASS by doing "import './file.scss'" in your TypeScript code
            {
                test: /\.s[ac]ss$/i, loader: [
                    // Creates `style` nodes from JS strings
                    'vue-style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },
            //Allow you to load files
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },

            // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
            {test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{loader: 'url-loader'}]},
        ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/ui.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui']
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ]
});
