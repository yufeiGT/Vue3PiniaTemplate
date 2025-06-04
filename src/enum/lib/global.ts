/**
 * 全局示例
 */
export enum Global {
	/**
	 * 全局 A
	 */
	A,
	/**
	 * 全局 B
	 */
	B,
	/**
	 * 全局 C
	 */
	C,
}
export namespace Global {
	/**
	 * 获取描述
	 * @param value
	 * @returns
	 */
	export function getDescription(value: Global) {
		switch (value) {
			case Global.A:
				return '全局 A';
			case Global.B:
				return '全局 B';
			case Global.C:
				return '全局 C';
			default:
				return '枚举错误';
		}
	}
}