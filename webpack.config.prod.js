const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FontPreloadPlugin = require("webpack-font-preload-plugin");

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './prod'),
        filename: '[name].[hash:8].js',
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new FontPreloadPlugin({
            index: "index.html",
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },


            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|gif)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'images/[name]-[hash][ext]',
                }
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'fonts/[name]-[hash][ext]',
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin()



        ],
    },
    devServer: {
        compress: false,
        open: true,
        port: 3000,
        hot: true,
    }
}
