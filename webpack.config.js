const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ChildProcess = require("child_process");
const Package = require("./package.json");
const webpack = require("webpack");

const checkEnvironment = (env) => process.env.NODE_ENV === env;
const checkGameMode = (gameMode) => process.env.GAME_MODE === gameMode;
const checkRegion = (region) => process.env.REGION === region;
const checkToken = (tokenType) => process.env.TOKEN === tokenType;

const PORT = 7300;
const isProd = checkEnvironment("production");
const isDev = !isProd;

const filename = (ext) => (isProd ? `bundle.[contenthash].${ext}` : `bundle.${ext}`);

const transferAssets = (assets) => {
	return {
		from: path.resolve(__dirname, `src/assets/${assets}`),
		to: path.resolve(__dirname, `build/${assets}`)
	};
};

const minimizer = () => {
	const settings = [];

	if (isProd) {
		settings.push(new CssMinimizerPlugin());
		settings.push(new TerserPlugin());
	}

	return settings;
};

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: ["event-target-polyfill", "@babel/polyfill", "./scripts/index.ts"],
	output: {
		filename: `scripts/${filename("js")}`,
		path: path.resolve(__dirname, "./build")
	},
	devtool: isDev ? "source-map" : false,
	devServer: {
		port: PORT,
		open: isDev,
		hot: isDev
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./index.html",
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd
			}
		}),
		new CopyPlugin({
			patterns: [
				transferAssets("fonts"),
				transferAssets("sounds"),
				transferAssets("sprites"),
				transferAssets("spines")
			]
		}),
		new MiniCssExtractPlugin({
			filename: `styles/${filename("css")}`
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			DEVELOPMENT: checkEnvironment("development"),
			PRODUCTION: checkEnvironment("production"),
			CHEAT_TOOL: checkGameMode("cheat_tool"),
			FUN: checkGameMode("fun"),
			LOGS: checkGameMode("logs"),
			UK: checkRegion("uk"),
			DYNAMIC_TOKEN: checkToken("dynamic"),
			COMMITHASH: '"' + ChildProcess.execSync("git rev-parse HEAD").toString().trim() + '"', // gets last git commit hash
			VERSION: '"' + Package.version + '"' // gets version from package json
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"],
		alias: {
			"@": path.resolve(__dirname, "src/scripts"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@utils": path.resolve(__dirname, "src/scripts/utils"),
			"@ui": path.resolve(__dirname, "src/scripts/ui"),
			"@types": path.resolve(__dirname, "src/scripts/types"),
			"@service": path.resolve(__dirname, "src/scripts/service"),
			"@models": path.resolve(__dirname, "src/scripts/models"),
			"@mock": path.resolve(__dirname, "src/scripts/mock"),
			"@interfaces": path.resolve(__dirname, "src/scripts/interfaces"),
			"@interceptors": path.resolve(__dirname, "src/scripts/interceptors"),
			"@enum": path.resolve(__dirname, "src/scripts/enum"),
			"@entities": path.resolve(__dirname, "src/scripts/entities"),
			"@constants": path.resolve(__dirname, "src/scripts/constants"),
			"@config": path.resolve(__dirname, "src/scripts/config"),
			"@factoires": path.resolve(__dirname, "src/scripts/factoires"),
			"@data": path.resolve(__dirname, "src/scripts/data"),
			"@stores": path.resolve(__dirname, "src/scripts/stores"),
			"@decorators": path.resolve(__dirname, "src/scripts/decorators")
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset/inline"
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules\/(?!(phaser3-rex-plugins)|(event-target-polyfill)))|(bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)|(bower_components)/,
				use: [{loader: "ts-loader", options: {transpileOnly: true}}]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: minimizer()
	}
};
