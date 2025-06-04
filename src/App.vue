<template>
	<ConfigProvider
		:theme="themeConfig"
		:locale="locale"
		:component-size="('samll' as any)"
	>
		<FortConfigProvider size="small">
			<router-view />
		</FortConfigProvider>
	</ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider, theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider as FortConfigProvider } from '@gluttons/fortress-ui';

dayjs.locale('zh-cn');

const locale = zhCN;

const themeConfig = {
	algorithm: theme.darkAlgorithm,
	token: {
		colorPrimary: '#0163c5',
		colorBgBase: '#010729',
		borderRadius: 4,
		wireframe: false,
		colorPrimaryActive: '#CCF0FF',
		colorPrimaryTextHover: '#0163c5',
		colorBgContainer: '#132D51',
	},
};
</script>

<style lang="scss">
#app {
	overflow: hidden;
	width: 100%;
	height: 100%;
}
</style>
