import { onBeforeUnmount, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { TableColumnProps } from 'ant-design-vue';
import { Condition, Requester, Clock } from '@gluttons/es-tools';
import { Launcher } from '@~crazy/launcher';

import * as API from '@/api';
import * as Entity from '@/entity';

export function use() {
	const condition = Condition.useRoute({
		page: 1,
		pageSize: 10,
	} as Launcher.Pagination.Params);
	return {
		condition,
	};
}

export function useTableData(
	condition: Condition.ConditionRoute<Launcher.Pagination.Params>
) {
	const { isRequesting, reset, send } = Requester.use();

	const columns: TableColumnProps[] = [
		{
			title: '用户 ID',
			dataIndex: 'id',
		},
		{
			title: '用户名',
			dataIndex: 'username',
		},
		{
			title: '用户令牌',
			dataIndex: 'token',
		},
	];

	const data = ref<Entity.User.UserInfo[]>([]);

	function query() {
		const { page, pageSize } = condition.target.value;
	}

	const { call, remove } = Clock.add(query, {
		removeHook: [onBeforeRouteLeave, onBeforeUnmount],
		interval: 1000 * 10,
		immediate: true,
	});

	condition.on('push', () => call());

	return {
		isRequesting,
		columns,
		data,
	};
}
