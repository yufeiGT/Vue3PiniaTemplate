<template>
	<div class="charts-container">
		<div class="charts-inner" ref="echartsContainer"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import * as Spanner from '@gluttons/spanner';

const erd = elementResizeDetectorMaker({
	strategy: 'scroll',
});

interface Opt extends EChartsOption {
	[propName: string]: any;
}

const props = withDefaults(
	defineProps<{
		option: Opt;
		notMerge?: boolean;
		before?: (option: Opt) => Opt;
	}>(),
	{
		notMerge: true,
		before: (opt) => opt,
	}
);

const emits = defineEmits<{
	(event: 'resize', width: number, height: number): void;
	(event: 'mounted', myCharts: echarts.ECharts): void;
}>();

const echartsContainer = ref<HTMLElement>(null);

let myCharts: echarts.ECharts;
let instance = ref<echarts.ECharts>();
defineExpose({
	instance,
});

function setOption(option: Opt) {
	if (myCharts) {
		if (Spanner.isFunction(props.before)) {
			myCharts.setOption(props.before(option), props.notMerge);
		} else {
			myCharts.setOption(option, props.notMerge);
		}
	}
}

const option = computed(() => {
	return Spanner.merge(
		true,
		{
			backgroundColor: 'transparent',
			tooltip: {
				confine: true,
				appendToBody: true,
			},
		},
		props.option
	);
});

watch(
	() => option.value,
	(value) => {
		setOption(value);
	}
);

onMounted(() => {
	if (echartsContainer.value instanceof HTMLElement) {
		myCharts = echarts.init(echartsContainer.value, 'dark');
		instance.value = myCharts;
		setOption(option.value);
		erd.listenTo(echartsContainer.value, () => {
			const { clientWidth, clientHeight } = echartsContainer.value;
			myCharts.resize();
			emits('resize', clientWidth, clientHeight);
		});

		let isInitRendered = false;
		myCharts.on('rendered', () => {
			if (!isInitRendered) {
				emits('mounted', myCharts);
				isInitRendered = false;
				myCharts.off('rendered');
			}
		});
	}
});

onBeforeUnmount(() => {
	if (myCharts) {
		erd.uninstall(echartsContainer.value);
		myCharts.dispose();
		myCharts = null;
	}
});
</script>

<style lang="scss" scoped>
.charts-container {
	overflow: hidden;
	width: 100% !important;
	height: 100% !important;
	position: relative;

	.charts-inner {
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: absolute;
	}
}
</style>
