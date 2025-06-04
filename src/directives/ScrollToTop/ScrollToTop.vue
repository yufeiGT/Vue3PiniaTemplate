<template>
	<div class="directive-scroll-top-top">
		<IconVue icon="totop" :size="CssUnits.rem(28)"></IconVue>
	</div>
</template>

<script lang="ts" setup>
import { CssUnits } from '@gluttons/fortress-ui';

import IconVue from '@/components/Icon.vue';
</script>

<style lang="scss" scoped>
$size: _rem(50px);

.directive-scroll-top-top {
	overflow: hidden;
	position: absolute;
	width: $size;
	height: $size;
	background: rgba(127, 164, 222, 0.35);
	border-radius: _rem(4px);
	right: $size;
	cursor: pointer;
	text-align: center;
	line-height: $size;
	color: #ccf0ff;
	padding: _rem(11px);
	z-index: 99;

	&:hover {
		background-color: #426ca5;
		color: #ccf0ff;
	}
}
</style>
