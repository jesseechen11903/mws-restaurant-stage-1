// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractNormalCSS = new ExtractTextPlugin('styles.css');
const ExtractReviewCSS = new ExtractTextPlugin('infostyles.css');

module.exports = {
	entry: {
		apps: "./js/apps",
		reviewapps: "./js/reviewapps",
		main: "./js/main",
		restaurant_info: "./js/restaurant_info",
		dbhelper: "./js/dbhelper"
	},
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				name: "commons",
	// 				chunks: "initial",
	// 				minChunks: 2,
	// 				minSize: 0
	// 			}
	// 		}
	// 	},
	// 	occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
	// },
  module: {
    rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				exclude: /css\/progressive-image.min.css/,
				use: ExtractNormalCSS.extract(
					{
						fallback: 'style-loader',
						use: [ { loader: 'css-loader', options:{ minimize: true} }]
					}
				)
			} //,
			// {
			// 	test: /\.css$/,
			// 	exclude: /css\/progressive-image.min.css/,
			// 	use: ExtractReviewCSS.extract(
			// 		{
			// 			fallback: 'style-loader',
			// 			use: [ { loader: 'css-loader', options:{ minimize: true} }]
			// 		}
			// 	)
			// }
    ]
	},
	plugins: [
		ExtractNormalCSS,
        ExtractReviewCSS,
	]
};
