import path from 'path';
import webpack from 'webpack';
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
const smp = new SpeedMeasurePlugin();

import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';

const commonConfig: webpack.Configuration = {
    entry: {
        main: path.resolve(__dirname, '../src/index.ts'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules',
            },
            {
                test: /\.(jpg|png|gif)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_hash.[ext]',
                        outputPath: 'images/',
                        limit: 10240, // 小于等于10kb时转换为base64
                    },
                },
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [new HtmlWebpackPlugin(), new BundleAnalyzerPlugin()],
};

export default (mode: string) => {
    if (mode === 'production') {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
};
