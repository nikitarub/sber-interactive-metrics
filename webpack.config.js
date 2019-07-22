const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	watch: false,
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		main: './src/script.js'
	},
	node: {
		fs: "empty"
 	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			App: path.resolve(__dirname, 'src/app'),
			Container: path.resolve(__dirname, 'src/app/components/container'),
			Modules: path.resolve(__dirname, 'src/modules'),
		  }
	},
	module: {
		rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
            },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            },
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,  
				use: [{
					loader: 'file-loader',
					options: { 
						name: 'images/[hash]-[name].[ext]'
					} 
				}]
			}

		]
	},
	plugins: [
    	new HtmlWebpackPlugin({
				template: 'src/index.html',
				title: 'StudTool',
    			filename: 'index.html',
    		// meta: {
    		// 	viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
    		// 	'http-equiv': 'X-UA-Compatible',
    		// 	content: 'ie=edge'
    		// }
    	})
  	]
};