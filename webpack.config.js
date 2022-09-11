const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    const isDev = options.mode === 'development';
    const config = {
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'inline-source-map' : false,
        context: path.resolve(__dirname, './src'),
        entry: {
            bundle: path.resolve(__dirname, 'src/js/index.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][contenthash].js',
            assetModuleFilename: 'assets/[name]-[hash][ext][query]',
            clean: true,
        },
        devServer: {
            open: true,
            port: 3000,
            hot: false,
            static: {
                directory: path.join(__dirname, 'dist'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.[tj]s$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(s[ac]|c)ss$/i,
                    use: [isDev ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                    type: isDev ? 'asset/resource' : 'asset',
                    generator: {
                        filename: 'assets/img/[name]-[hash][ext][query]',
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.(mp[34]|wav|ogg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/audio/[name].[ext]'
                    }
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html',
                favicon: 'assets/favicon.ico'
            }),
            new MiniCssExtractPlugin({
                filename: '[name]-[contenthash].css'
            }),
            new CopyPlugin({
                patterns: [{
                    from: path.resolve(__dirname, './public'),
                    to: path.resolve(__dirname, './dist/assets/img'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, './src/assets/bg'),
                    to: path.resolve(__dirname, './dist/assets/bg'),
                }],
            }),
        ],
        resolve: {
            extensions: ['.js', '.ts'],
        },
    };

    return config;
}