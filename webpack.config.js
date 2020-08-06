const path = require('path')
const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


function resolve(dir) {
    return path.join(__dirname, dir)
}

const datahubConfig = {
    port: 5175,
    hostname: '127.0.0.1',
    store: path.join(__dirname, '..', 'data'),
    proxy: {
        '/api': {
            hub: 'todo',
        },
    },
    showBoard: true,
};

const defaultDatahub = new DataHub({
    port: datahubConfig.port,
});


module.exports = {
    // entry: path.join(__dirname, 'src/main.js'),
    entry: resolve('src/main.js'),
    output: {
        path: resolve('dist'),
        // filename:'bundle.js',
        filename: 'bundle-[hash].js',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                // use:['style-loader','css-loader']
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000, //当文件大小小于limit byte时会把图片转换为base64编码的dataurl，否则返回普通的图片
                        name: "dist/assest/images/[name]-[hash:5].[ext]"
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue'],
        alias: {
            '@': resolve('src'),
        }
    },
    devServer: {
        before: app => {
            console.log('before')
            datahubMiddleware(app)(datahubConfig);
        },
        after: () => {
            console.log('after-1')
            // console.log(datahubConfig)
            defaultDatahub.startServer(datahubConfig).then(() => {
                console.log('datahub ready');
            });
            console.log('after-2')
        }
    }
}