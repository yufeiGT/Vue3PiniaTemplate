import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { Clock } from '@gluttons/es-tools';

import '@/assets/icons/index.js';
import '@/assets/stylesheets/app.scss';

import directives from './directives';
import router from './router';

import AppVue from './App.vue';

const app = createApp(AppVue);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(router).use(pinia).use(directives).mount('#app');

// 应用时钟，开启定时请求功能
Clock.use(1000 * 60);
