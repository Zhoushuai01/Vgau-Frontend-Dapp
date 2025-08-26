import {
	createSSRApp
} from "vue";
import uviewPlus, { setConfig } from 'uview-plus'
import i18n from './i18n/i18n.js'

import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	
	// 使用uview-plus
	app.use(uviewPlus,()=>{
		return {
			options: {
				config: {
					unit: 'rpx', //修改成rpx单位
					interceptor: {
						navbarLeftClick:() => {
							console.log('全局拦截')
						}
					}
				},
				props: {
					alert: {
						type: 'error'
					}
					
				}
			}
		}
	});
	
	// 使用i18n
	app.use(i18n);
	
	return {
		app,
	};
}
