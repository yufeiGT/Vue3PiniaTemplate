import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

import { useAuthStore } from '@/store/auth';

export function use() {
	const { Login } = useAuthStore();
	const router = useRouter();

	const usernameInput = ref<HTMLInputElement>(null);
	const passwordInput = ref<HTMLInputElement>(null);

	const isLoading = ref(false);
	const username = ref('');
	const password = ref('');
	const usernameError = ref('');
	const passwordError = ref('');

	if (process.env.NODE_ENV === 'development') {
		username.value = 'admin';
		password.value = 'admin';
	}

	return {
		/**
		 * 正在登录
		 */
		isLoading,
		/**
		 * 用户名
		 */
		username,
		/**
		 * 密码
		 */
		password,
		/**
		 * 用户名错误信息
		 */
		usernameError,
		/**
		 * 密码错误信息
		 */
		passwordError,
		/**
		 * 设置元素
		 * @param username 用户名输入框
		 * @param password 密码输入框
		 */
		setElement(username: HTMLInputElement, password: HTMLInputElement) {
			usernameInput.value = username;
			passwordInput.value = password;
		},
		/**
		 * 登录
		 */
		Login() {
			if (!username.value.length) {
				usernameError.value = '用户名不能为空';
				usernameInput.value.focus();
				return;
			}
			if (!password.value.length) {
				passwordError.value = '密码不能为空';
				passwordInput.value.focus();
				return;
			}
			isLoading.value = true;
			Login({
				username: username.value,
				password: password.value,
			})
				.then((res) => {
					isLoading.value = false;
					router.push('/');
				})
				.catch((e) => {
					isLoading.value = false;
					message.error(e.message);
				});
		},
	};
}
