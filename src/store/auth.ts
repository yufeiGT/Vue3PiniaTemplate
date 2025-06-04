import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import * as API from '@/api';
import * as Entity from '@/entity';
import router from '@/router';

/**
 * 应用授权仓库
 */
export const useAuthStore = defineStore(
	'auth',
	() => {
		/**
		 * 用户数据
		 */
		const userInfo = ref(Entity.User.UserInfo.getDefault());

		/**
		 * 是否已授权
		 */
		const isAuth = computed(() => !!userInfo.value.token);

		/**
		 * 设置授权数据
		 * @param value
		 */
		function setAuthData(value: typeof userInfo.value) {
			userInfo.value.id = value.id;
			userInfo.value.username = value.username;
			userInfo.value.nickname = value.nickname;
			userInfo.value.picture = value.picture;
			userInfo.value.roles = value.roles;
			userInfo.value.token = value.token;
			API.launcher.setAuthorization(value.token);
		}

		/**
		 * 清除授权数据
		 */
		function clearAuthData() {
			const { id, username, nickname, picture, roles, token } =
				Entity.User.UserInfo.getDefault();
			userInfo.value.id = id;
			userInfo.value.username = username;
			userInfo.value.nickname = nickname;
			userInfo.value.picture = picture;
			userInfo.value.roles = roles;
			userInfo.value.token = token;
			API.launcher.clearAuthorization();
		}

		/**
		 * 登录
		 * @param params
		 * @returns
		 */
		function Login(params: Parameters<typeof API.User.Login>[0]) {
			let data = Entity.User.UserInfo.getDefault();
			return new Promise<typeof data>(async (resolve, reject) => {
				try {
					const { data } = await API.User.Login(params);
					setAuthData(data);
					resolve(data);
				} catch (err) {
					console.error(err);
					clearAuthData();
					reject(err);
				}
			});
		}

		/**
		 * 注销
		 */
		function Logout() {
			clearAuthData();
			router.push({
				name: 'Login',
			});
		}

		return {
			userInfo,
			isAuth,
			setAuthData,
			clearAuthData,
			Login,
			Logout,
		};
	},
	{
		persist: true,
	}
);
