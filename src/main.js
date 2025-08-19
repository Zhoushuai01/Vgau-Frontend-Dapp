import {
	createSSRApp
} from "vue";
import uviewPlus, { setConfig } from 'uview-plus'

import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
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
	return {
		app,
	};
}
