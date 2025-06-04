import { RouteRecordRaw } from 'vue-router';
import { Router } from '@gluttons/es-tools';

import { useAuthStore } from '@/store/auth';

import HomeVue from '@/views/Home/index.vue';
import LoginVue from '@/views/Login/index.vue';
import TestVue from '@/views/Test.vue';
import NotFoundVue from './views/NotFound.vue';

const routerConfig: Router.Config[] = [
	{
		label: '首页',
		name: 'Home',
		component: HomeVue,
	},
];

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'Login',
		component: LoginVue,
	},
];

if (process.env.NODE_ENV == 'development') {
	routes.push({
		path: '/test',
		name: 'Test',
		component: TestVue,
	});
}

routes.push({
	path: '/:pathMatch(.*)',
	name: 'NotFound',
	component: NotFoundVue,
});

const { router } = Router.use(routerConfig, {
	routes,
});

router.beforeEach((to, from, next) => {
	const { isAuth } = useAuthStore();
	if (to.name === 'Login') {
		if (!isAuth) {
			next();
		} else if (from.name) {
			next(false);
		} else {
			next('/');
		}
	} else {
		if (!isAuth) {
			next({
				name: 'Login',
			});
		} else {
			next();
		}
	}
});

export default router;
