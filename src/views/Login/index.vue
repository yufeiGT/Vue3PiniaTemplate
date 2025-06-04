<template>
	<div v-loading:body="isLoading" class="login">
		<div class="login-container">
			<div class="title">
				<p>欢迎使用</p>
			</div>
			<ul>
				<li
					:class="{
						error: usernameError.length,
					}"
				>
					<Input
						@change="usernameError = ''"
						ref="usernameInput"
						v-model:value="username"
						placeholder="用户名"
						:allow-clear="true"
					/>
					<p>{{ usernameError }}</p>
				</li>
				<li
					:class="{
						error: passwordError.length,
					}"
				>
					<Input
						@change="passwordError = ''"
						ref="passwordInput"
						v-model:value="password"
						type="password"
						placeholder="密码"
						:allow-clear="true"
					/>
					<p>{{ passwordError }}</p>
				</li>
				<li>
					<Button @click="Login" block>登录</Button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Button, Input } from 'ant-design-vue';

import { use } from './use';

const {
	isLoading,
	username,
	password,
	usernameError,
	passwordError,
	setElement,
	Login,
} = use();

const usernameInput = ref<HTMLInputElement>(null);
const passwordInput = ref<HTMLInputElement>(null);

onMounted(() => {
	setElement(usernameInput.value, passwordInput.value);
});
</script>

<style lang="scss" scoped>
.login {
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;

	.login-container {
		overflow: hidden;
		width: 400px;
		padding: 50px;
		margin-left: px_2_vw(200px);
		margin-bottom: px_2_vh(200px);

		.title {
			overflow: hidden;
			text-align: left;

			p {
				overflow: hidden;
				font-size: _rem(30px);
				margin: 0;
			}
		}

		ul {
			overflow: hidden;
			margin: 0;
			margin-top: 30px;

			li {
				overflow: hidden;

				:deep(.ant-input-affix-wrapper) {
					border: none;
					border-bottom: solid 1px #fff;
					height: 40px;
				}

				:deep(.ant-btn) {
					height: 44px;
					background-color: #fff;

					span {
						color: #000;
						font-size: 1rem;
					}
				}

				p {
					overflow: hidden;
					color: #f00;
					height: 30px;
					line-height: 30px;
					text-align: right;
				}

				&.error {
					:deep(.ant-input-affix-wrapper) {
						border-bottom-color: #f00;
					}
				}
			}
		}
	}
}
</style>
