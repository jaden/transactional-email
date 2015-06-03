var webpack = require("webpack");
var fs = require("fs");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// TODO Delete dist directory before another run
//  https://github.com/johnagan/clean-webpack-plugin - so few users, makes me think there's another way
// TODO Get all CSS files bundled together (style.css, bootstrap)

var OUTPUT_DIR = "./dist";

module.exports = {
    
    entry: "./js/bootstrap.js",
    
    devtool: "source-map",

    output: {
        path: OUTPUT_DIR,
        filename: "bundle.min.[hash].js"
    },
    
    module: {
        loaders: [
            { test: /\.css$/,    loader: "style-loader!css-loader" },
            { test: /\.woff$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ],
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // Automatically provide jQuery to all modules.
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        function() {
            this.plugin("done", function(stats) {
                var html = fs.readFileSync('index.html', 'utf8');
                html = html.replace(/\[hash\]/g, stats.hash);
                fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), html);
            });
        }

        // new ExtractTextPlugin(filename : "./dist/bundle.min.[hash].css", { allChunks: true })
    ]
};