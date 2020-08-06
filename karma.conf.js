const webpack = require('webpack')

const {
    merge
} = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')
const webpackConfig = merge(baseWebpackConfig, {
    devtool: '#inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
                // NODE_ENV: '"production"',
            }
        })
    ]
})

delete webpackConfig.entry

module.exports = function (config) {
    // 配置文档地址 ： https://github.com/karma-runner/karma/blob/master/docs/config/01-configuration-file.md
    config.set({
        browsers: ['Chrome'],
        // 并发级别（启动的浏览器数）
        // concurrency: Infinity,
        frameworks: ['mocha'],
        // frameworks: ['sinon-chai'],
        // frameworks: ['phantomjs-shim'],
        // frameworks: ['mocha','sinon-chai', 'phantomjs-shim'],
        files: ['./test/unit/index.js'],
        preprocessors: {
            './test/unit/index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        colors: true,
        /**
         * 启用或禁用自动检测文件变化进行测试
         */
        autoWatch: true,
        /**
         * 日志等级
         * 可能的值：
         * config.LOG_DISABLE //不输出信息
         * config.LOG_ERROR    //只输出错误信息
         * config.LOG_WARN //只输出警告信息
         * config.LOG_INFO //输出全部信息
         * config.LOG_DEBUG //输出调试信息
         */
        logLevel: config.LOG_INFO,

        //报告
        reporters: ['coverage'],
        coverageReporter: {
            dir: './test/unit/coverage',
            type: "html",
        },
    })
}