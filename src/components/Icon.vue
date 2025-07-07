<template>
	<Flex
		vert
		auto
		align="center"
		:style="{
			width,
			height,
			overflow: 'hidden !important',
			color,
		}"
	>
		<svg
			class="svg-icon"
			:class="className"
			aria-hidden="true"
			:style="{
				width,
				height,
			}"
		>
			<use :xlink:href="`#icon-${icon}`" />
		</svg>
	</Flex>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Flex, CssUnits } from '@gluttons/fortress-ui';

const props = withDefaults(
	defineProps<{
		icon: string;
		className?: string;
		size?: string | number;
		width?: string | number;
		height?: string | number;
		color?: string;
	}>(),
	{
		size: 20,
		color: 'inherit',
	}
);

const size = computed(() => toValue(props.size));

const width = computed(() => {
	if (props.width !== undefined) {
		return toValue(props.width);
	} else {
		return size.value;
	}
});

const height = computed(() => {
	if (props.height !== undefined) {
		return toValue(props.height);
	} else {
		return size.value;
	}
});

function toValue(value: string | number) {
	if (isNaN(value as number)) {
		return value;
	} else {
		return CssUnits.rem(value as number);
	}
}
</script>

<style lang="scss" scoped>
.svg-icon {
	overflow: hidden;
	fill: currentColor;
}
</style>
