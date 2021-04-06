const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/js/main.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/newTab.html',
			filename: 'newTab.html'
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/manifest.dev.json', to: 'manifest.json' }]
		})
	]
};
