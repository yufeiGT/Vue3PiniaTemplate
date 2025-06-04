<template>
	<Flex
		v-loading="isRequesting"
		vert="auto"
		fill
		pad
		gap
		align-cross="center"
	>
		<Table :columns="columns" :data-source="data"></Table>
	</Flex>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { Flex } from '@gluttons/fortress-ui';

import { use, useTableData } from './use';

const { condition } = use();
const { isRequesting, columns, data } = useTableData(condition);
</script>

<style lang="scss" scoped></style>
