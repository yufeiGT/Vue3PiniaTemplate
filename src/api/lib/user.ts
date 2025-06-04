import { Launcher } from '@~crazy/launcher';

import * as Entity from '@/entity';

import { launcher } from '../launcher';

/**
 * 登录
 * @param params
 */
export function Login(params: Entity.User.UserInfo.RequestParams) {
	return new Promise<Launcher.Response<Entity.User.UserInfo>>((resolve) => {
		resolve({
			data: {
				id: 1,
				username: params.username,
				nickname: '管理员',
				picture: '',
				roles: [],
				token: 'XXXX',
			},
			code: 200,
			message: '成功',
			dateTime: Date.now(),
		});
	});
	// return launcher.post<Entity.User.UserInfo, typeof params>(
	// 	'/user/login',
	// 	params,
	// 	{
	// 		defaultResponse: Entity.User.UserInfo.getDefault(),
	// 	}
	// );
}
