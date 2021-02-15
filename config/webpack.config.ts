import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: { path: path.resolve(__dirname, '../dist'), filename: 'bundle.js' },
};

export default config;
