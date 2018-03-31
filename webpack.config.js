var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PurifyCSSPlugin = require('purifycss-webpack');
//var ifProduction = (process.env.NODE_ENV === 'production');
const ifProduction = false;


module.exports = {

    context: path.resolve(__dirname, './resources/assets'),

    entry: {
        app: ['./js/app.js', './sass/app.scss'],
        vendor: ['./js/vendor.js', './sass/vendor.scss'],

    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: '[chunkhash].bundle.js'
    },

    module:{

        rules:[

            {
                test: /\.s[ac]ss$/,
                //use: ['css-loader', 'sass-loader'],

                use: ExtractTextPlugin.extract({

                    use: [
                        {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: { url: false }
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }],

                    fallback: 'style-loader'

                })


            },

            // {
            //     test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            //     use: [{
            //
            //         loader: 'file-loader',
            //         options: {
            //             name: './media/[name].[hash].[ext]'
            //         }
            //     }]
            //
            //
            // },

            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },

            // {
            //     test: /\.js$/,
            //     exclude: '/node_modules/',
            //     loader: "babel-loader"
            // }
        ]

    },

    plugins: [

        new ExtractTextPlugin('[chunkhash].css'),

        // new PurifyCSSPlugin({
        //
        //     paths: glob.sync(path.join(__dirname, './resources/assets/views/*.blade.php')),
        //     minimize: ifProduction
        //
        // }),

        new webpack.LoaderOptionsPlugin({

            minimize: ifProduction

        })

    ]
};

