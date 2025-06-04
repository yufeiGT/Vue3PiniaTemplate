import { App, createApp, nextTick } from 'vue';
import * as Spanner from '@gluttons/spanner';

import ScrollToTop from './ScrollToTop.vue';

const handlerKey = Symbol('directiveScrollToTopHandler');
const elKey = Symbol('directiveScrollToTopElement');

const className = 'directive-scroll-to-top-target';

function checkScrollStatus() {
	const self = this as HTMLElement;
	const { scrollTop, clientHeight } = self;
	const isVisible = scrollTop >= clientHeight / 2;
	const el = this[elKey] as HTMLElement;
	if (isVisible) {
		el.style.bottom = `${clientHeight / 3 - scrollTop}px`;
		if (el.parentNode !== self) {
			self.appendChild(el);
		}
	} else {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
	}
}

export default function initScrollToTop(app: App) {
	app.directive('scrollToTop', {
		mounted(el: HTMLElement, { value }) {
			el[handlerKey] = value;
			const container = document.createElement('div');
			const instance = createApp(ScrollToTop, {
				onClick: () => {
					el.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
					nextTick(() => {
						if (Spanner.isFunction(el[handlerKey])) {
							el[handlerKey]();
						}
					});
				},
			}).mount(container);
			el[elKey] = instance.$el;
			const { position } = getComputedStyle(el);
			if (position != 'absolute' && position != 'fixed') {
				el.classList.add(className);
			}
			el.addEventListener('scroll', checkScrollStatus);
		},
		updated(el: HTMLElement, { value }) {
			el[handlerKey] = value;
		},
		beforeUnmount(el: HTMLElement) {
			delete el[handlerKey];
			delete el[elKey];
			el.classList.remove(className);
			el.removeEventListener('scroll', checkScrollStatus);
		},
	});
}
