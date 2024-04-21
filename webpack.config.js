const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackMessages = require('webpack-messages');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildJS = (mode) => ({
    mode,
    target: 'web',
    stats: false,
    entry: {
        app: './src/app.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('assets/js'),
        compareBeforeEmit: true,
        clean: true,
        library: {
            name: '[name]',
            type: 'var',
        }
    },
    devtool: mode === 'production' ? false : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: 'es2020',
                            tsconfigRaw: require('./tsconfig.json'),
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
        alias: {
            'react': 'preact/compat',
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new WebpackMessages({
            name: 'js:app',
        }),
    ],
});

const buildCSS = (mode) => ({
    mode,
    stats: false,
    entry: {
        app: './sass/index.scss',
    },
    output: {
        filename: 'artifacts/[name]',
        path: path.resolve('assets/css'),
        compareBeforeEmit: true,
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new WebpackMessages({
            name: 'css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            grid: 'no-autoplace',
                                        },
                                    ],
                                    mode === 'production' ? 'cssnano' : '',
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            sass: path.resolve('./sass'),
        },
    },
    externals: {},
});


module.exports = (env, argv) => {
    const mode = argv.mode || 'production';

    return [buildJS(mode), buildCSS(mode)];
};