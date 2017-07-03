var webpack = require('webpack');
var path = require('path');


module.exports = {

	//页面入口文件配置
	entry: {
		index:"./project/desktop/es6/index.es6"
	},
	devtool:false,
	//入口文件输出配置
	output: {
		path: __dirname+"/project/desktop/www/js/dist",
		filename: "[name].min.js"
	},
	// watch:true,
	module: {
		//加载器配置
		loaders: [
			{
				test: /\.es6?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015','stage-3'],
					plugins: ["transform-decorators-legacy"]
				}
			}
		]
	},
	//其它解决方案配置
	resolve: {
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: ['.es6','.js'],
		//自己的库地址
		modules: [
			path.resolve(__dirname, "./project/desktop/es6/lib"),
			"node_modules"
		]
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		// alias: {
		// 	//后续直接 require('mod1') 即可
		// 	mod1 : __dirname+'/js/mod1.es6',
		// 	mod2 : __dirname+'/js/mod2.js',
		// 	mod3 : __dirname+'/js/mod3.es6'
		// }
	},
	//插件
	plugins:[
		//去除注释 压缩代码
		new webpack.optimize.UglifyJsPlugin({
			compress: true,
			output: {
				comments: false
			},
			except: ['$super', '$', 'exports', 'require','super','window']    //排除关键字
		}),
		//合并公共部分生成单独的文件,需要单独引用  pub.bundle.js
		// new webpack.optimize.CommonsChunkPlugin('pub'),
		//文件头部注释
		new webpack.BannerPlugin("######5878794@qq.com######")

	]
};