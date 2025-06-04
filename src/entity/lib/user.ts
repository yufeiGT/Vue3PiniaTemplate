/**
 * 用户数据
 */
export interface UserInfo {
	/**
	 * 用户ID
	 */
	id: number;
	/**
	 * 用户名
	 */
	username: string;
	/**
	 * 昵称
	 */
	nickname: string;
	/**
	 * 用户头像
	 */
	picture: string;
	/**
	 * 用户角色列表
	 */
	roles: string[];
	/**
	 * 用户令牌
	 */
	token: string;
}
export namespace UserInfo {
	/**
	 * 获取默认值
	 * @returns
	 */
	export function getDefault(): UserInfo {
		return {
			id: null,
			username: '',
			nickname: '',
			picture: '',
			roles: [],
			token: null,
		};
	}

	/**
	 * 请求参数
	 */
	export interface RequestParams {
		/**
		 * 用户名
		 */
		username: string;
		/**
		 * 密码，需要使用 md5 进行加密（32位大
		 */
		password: string;
	}
}
