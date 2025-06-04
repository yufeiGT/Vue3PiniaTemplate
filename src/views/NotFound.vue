<template>
	<Flex vert="auto" gap align="center">
		<Flex hor="auto" :gap="90">
			<Image
				:src="require('@/assets/images/404.png')"
				:width="CssUnits.rem(298)"
				:height="CssUnits.rem(232)"
				:preview="false"
			></Image>
			<Flex vert="auto" :gap="20" align-main="center" sandbox>
				<p class="title">404</p>
				<Flex vert :gap="5">
					<p>很抱歉，您所访问的页面地址有误，</p>
					<p>或该页面不存在。</p>
				</Flex>
				<Flex>
					<Button @click="goHome">返回首页</Button>
				</Flex>
			</Flex>
		</Flex>
	</Flex>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Image, Button } from 'ant-design-vue';
import { Flex, CssUnits } from '@gluttons/fortress-ui';

const router = useRouter();

function goHome() {
	router.push('/');
}
</script>

<style lang="scss" scoped>
p {
	color: #d4e3fa;
	font-size: _rem(16px);

	&.title {
		font-size: _rem(48px);
	}
}
.ant-btn {
	background-color: #d4e3fa;
	color: #041228;

	&:hover {
		color: #000;
	}
}
</style>
