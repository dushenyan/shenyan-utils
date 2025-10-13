import { nextTick } from 'vue';
import '../theme/loading.css';

/**
 * 创建 loading
 */
function start() {
	const bodys: Element = document.body;
	const div = <HTMLElement>document.createElement('div');
	div.setAttribute('class', 'loading-next');
	const htmls = `
			<div class="loading-next-box">
				<div class="loading-next-box-warp">
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
				</div>
			</div>
		`;
	div.innerHTML = htmls;
	bodys.insertBefore(div, bodys.childNodes[0]);
	window.nextLoading = true;
}

/**
 * 移除 loading
 */
function done() {
	nextTick(() => {
		window.nextLoading = false;
		const el = <HTMLElement>document.querySelector('.loading-next');
		el?.parentNode?.removeChild(el);
	});
}
