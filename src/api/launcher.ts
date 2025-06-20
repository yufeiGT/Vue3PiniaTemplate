import { Launcher } from '@gluttons/launcher';
import { message } from 'ant-design-vue';

import router from '@/router';
import { useAuthStore } from '@/store/auth';

const { VUE_APP_RequestBaseURL, VUE_APP_WithCredentials } = process.env;

export interface ResponseExtra extends Pick<Launcher.ResponseExtra, 'message'> {
	/**
	 * 请求数据产生的时间戳
	 */
	dateTime: number;
}

export interface PaginationResponse
	extends Pick<Launcher.PaginationResponse, 'count'> {
	/**
	 * 当前页码
	 */
	index: number;
	/**
	 * 每页显示行数
	 */
	size: number;
}

export const launcher = new Launcher<ResponseExtra, Launcher.PaginationParams, PaginationResponse>({
	baseUrl: VUE_APP_RequestBaseURL,
	credentials: VUE_APP_WithCredentials === 'true',
	requestOptions: {
		timeoutAgain: false,
		headers: {},
		beforeHandler: () => {
			const { userInfo } = useAuthStore();
			launcher.setAuthorization(userInfo.token);
		},
		timeoutHandler: (options, again) => {
			let msg = `请求接口'${options.url}'超时`;
			if (again) {
				msg += ',正在重新发起请求';
			}
			message.error(msg);
			console.error(msg);
		},
	},
	authHandler: (code) => {
		const { Logout } = useAuthStore();
		if (code == 401) {
			message.error('非法请求，用户未授权');
			Logout();
			router.push({
				name: 'Login',
			});
		} else if (code == 403) {
			message.error('禁止访问，用户令牌无效');
			Logout();
			router.push({
				name: 'Login',
			});
		}
	},
});
