require("./project/Project.js");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: BUILD_DESTINATION+"/"+PROJECT_NAME,
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loaders: ["style-loader", "css-loader"] }
        ],
        rules: [
            // Load babel and downgrade to es15 for back browsers.
            {
                test: /\.(js|jsx)$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        function() {
            this.plugin("done", function(stats) {
                
            })
        }
    ]
};
