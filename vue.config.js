var path = require('path');
const { VUE_APP_PublicPath, Vue_APP_ProxyUrl } = process.env;

module.exports = {
	publicPath: VUE_APP_PublicPath,
	productionSourceMap: false,
	outputDir: '{{outputDir}}',
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@use "@/assets/stylesheets/global.scss";`,
			},
		},
	},
	configureWebpack: (config) => {
		config.devtool = 'source-map';
	},
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = '{{title}}';
			return args;
		});
		config.module
			.rule('svg')
			.uses.clear()
			.end()
			.exclude.add(path.resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(path.resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end();
	},
	devServer: {
		historyApiFallback: true,
		allowedHosts: 'all',
		client: {
			overlay: false,
		},
		proxy: {
			'/api': {
				target: Vue_APP_ProxyUrl,
				changeOrigin: true,
				logLevel: 'debug',
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
};
