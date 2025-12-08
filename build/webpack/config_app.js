const path = require('path');
const makeCacheGroup = require('./helpers').makeCacheGroup;
const PATHS = require('./paths');
const getPlugins = require('./plugins');

const appConfig = (grunt) => ({
    entry: {
        // Output binary.min.js for release builds OR when NODE_ENV is production (for CI/CD builds like Cloudflare Pages)
        [global.is_release || process.env.NODE_ENV === 'production' ? 'binary.min' : 'binary']: path.resolve(PATHS.SRC, 'javascript'),
    },
    output: {
        path: path.resolve(PATHS.DIST, 'js'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                ...makeCacheGroup('vendor', -20, 'node_modules'),
            },
        },
    },
    plugins: getPlugins('app', grunt),
});

module.exports = appConfig;
