import { App, createApp } from 'vue';

import Loading from './Loading.vue';

import './index.scss';

function switchLoading(target: any, visible: boolean): void {
	if (!(target.$directiveLoadingElement instanceof HTMLElement)) return;
	if (visible) {
		target.appendChild(target.$directiveLoadingElement);
	} else {
		if (target.$directiveLoadingElement.parentNode instanceof HTMLElement) {
			(
				target.$directiveLoadingElement.parentNode as HTMLElement
			).removeChild(target.$directiveLoadingElement);
		}
	}
}

export default function initLoading(app: App): void {
	app.directive('loading', {
		mounted(el, { arg, value }) {
			let target = el;
			if (arg === 'body') {
				target = document.body;
			}
			if (
				!('$directiveLoadingElement' in target) ||
				!(target.$directiveLoadingElement instanceof HTMLElement)
			) {
				const container: HTMLElement = document.createElement('div');
				createApp(Loading).mount(container);
				const { position } = getComputedStyle(target);
				if (position != 'absolute' && position != 'fixed') {
					(target as HTMLElement).classList.add(
						'directive-loading-target'
					);
				}
				target.$directiveLoadingElement = container;
			}
			switchLoading(target, value);
		},
		updated(el, { arg, oldValue, value }) {
			if (oldValue === value) return;
			let target = el;
			if (arg === 'body') {
				target = document.body;
			}
			switchLoading(target, value);
		},
		beforeUnmount(el, { arg }) {
			let target = el;
			if (arg === 'body') {
				target = document.body;
			}
			(target as HTMLElement).classList.remove(
				'directive-loading-target'
			);
			switchLoading(target, false);
			delete target.$directiveLoadingElement;
		},
	});
}
