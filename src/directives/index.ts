import { App } from 'vue';

import Loading from './Loading/index';

export default function initDirectives(app: App): void {
	Loading(app);
}
