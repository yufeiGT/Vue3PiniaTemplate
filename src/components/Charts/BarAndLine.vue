<template>
	<Flex style="width: 100%; height: 100%;">
		<Flex vert="auto" fill v-if="empty" align="center">
			<Empty :image="Empty.PRESENTED_IMAGE_SIMPLE"></Empty>
		</Flex>
		<BaseVue
			v-else
			:option="option"
			:not-merge="notMerge"
			:before="before"
			@mounted="onChartMounted"
			ref="chart"
		></BaseVue>
	</Flex>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import { Empty } from 'ant-design-vue';
import { EChartsOption } from 'echarts';
import * as Spanner from '@gluttons/spanner';
import { Flex } from '@gluttons/fortress-ui';
import * as echarts from 'echarts';

import BaseVue from './Base.vue';

interface Opt extends EChartsOption {
	[propName: string]: any;
}

const props = withDefaults(
	defineProps<{
		data: Array<{
			name: string;
			values: Array<number | string>;
			index?: number;
			xIndex?: number;
			type?: 'bar' | 'line';
			markLine?: any;
		}>;
		markList: string[];
		ruleList: Array<{
			name: string;
			position?: 'left' | 'right';
			offset?: number;
			max?: number | string;
			min?: number | string;
		}>;
		/**
		 * 图表类型
		 */
		type?: 'bar' | 'line';
		/**
		 * 方向
		 */
		direction?: 'hor' | 'ver';
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
		type: 'bar',
		direction: 'hor',
		color: null,
		customOption: () => {
			return {};
		},
		notMerge: true,
	}
);

const emits = defineEmits<{
	(event: 'mounted', myCharts: echarts.ECharts): void;
}>();
const onChartMounted = (myCharts: echarts.ECharts) => {
	emits('mounted', myCharts);
};

let chart = ref();
defineExpose({
	chart,
});

const option = computed(() => {
	const opts: any = {};
	if (Spanner.isArray(props.color)) {
		opts.color = props.color;
	}
	const categoryAxis = {
		type: 'category',
		data: props.markList,
		axisTick: {
			alignWithLabel: true,
		},
	};
	const valueAxis = props.ruleList.length
		? props.ruleList.map((item) => {
				return {
					type: 'value',
					axisLine: {
						show: true,
					},
					axisTick: {
						show: true,
					},
					splitLine: {
						show: false,
					},
					...item,
				};
		  })
		: {
				name: 'Y轴',
		  };
	const option: Opt = {
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			icon: 'roundRect',
			type: 'scroll',
		},
		series: props.data.map((item) => {
			return {
				type: item.type || props.type,
				smooth: true,
				barMaxWidth: 50,
				name: item.name,
				data: item.values,
				yAxisIndex: item.index || 0,
				xAxisIndex: item.xIndex || 0,
				symbol: 'none',
				markLine: item.markLine,
			};
		}),
	};
	if (props.direction == 'hor') {
		option.grid = {
			left: 20,
			right: 20,
			bottom: 0,
			containLabel: true,
		};
		option.xAxis = categoryAxis as any;
		option.yAxis = valueAxis as any;
	} else {
		option.grid = {
			top: 30,
			left: 0,
			right: 30,
			bottom: 0,
			containLabel: true,
		};
		option.xAxis = valueAxis as any;
		option.yAxis = categoryAxis as any;
	}
	return Spanner.merge<Opt>(true, option, opts, props.customOption || {});
});

const empty = computed(() => {
	const hasSeriesData =
		(Array.isArray(props.data) &&
			props.data.some((item) => item.values.length)) ||
		(props.customOption.series &&
			props.customOption.series.data &&
			props.customOption.series.data.length) ||
		(Array.isArray(props.customOption.series) &&
			props.customOption.series.some(
				(item) => item.data && item.data.length
			));
	const hasXAxisData =
		(props.markList && !!props.markList.length) || props.customOption.xAxis;
	if (
		hasSeriesData &&
		hasXAxisData &&
		props.ruleList &&
		!!props.ruleList.length
	) {
		return false;
	}

	return true;
});
</script>

<style lang="scss" scoped></style>
