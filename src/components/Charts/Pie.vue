<template>
	<BaseVue :option="option" :not-merge="notMerge" :before="before"></BaseVue>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { EChartsOption } from 'echarts';
import * as Spanner from '@gluttons/spanner';

import BaseVue from './Base.vue';

interface Opt extends EChartsOption {
	[propName: string]: any;
}

const props = withDefaults(
	defineProps<{
		data: Array<{
			name: string;
			value: number;
		}>;
		/**
		 * 颜色组
		 */
		color?: string[];
		/**
		 * 自定义选项
		 */
		customOption?: {
			[propName: string]: any;
		};
		/**
		 * 不合并选项
		 */
		notMerge?: boolean;
		before?: (option: Opt) => Opt;
	}>(),
	{
		color: null,
		customOption: () => {
			return {};
		},
		notMerge: true,
	}
);

const option = computed(() => {
	const opts: any = {};
	if (Spanner.isArray(props.color)) {
		opts.color = props.color;
	}
	return Spanner.merge(
		true,
		{
			tooltip: {
				trigger: 'item',
			},
			// legend: {
			// 	left: 'center',
			// },
			series: [
				{
					type: 'pie',
					radius: '80%',
					data: [...props.data],
				},
			],
		},
		opts,
		props.customOption || {}
	);
});
</script>

<style lang="scss" scoped></style>
