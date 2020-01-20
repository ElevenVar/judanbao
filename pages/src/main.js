// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/index'
import Vuex from 'vuex'
import common from './assets/js/common'
import iView from 'iview';
import Layer from 'vue-layer'
import 'iview/dist/styles/iview.css';

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(common);
Vue.use(Viewer)

Vue.prototype.$layer = Layer(Vue);
Vue.config.productionTip = false

const router = new VueRouter({
	routes,
	mode: 'history'
});
//路由登录拦截
router.beforeEach((to, from, next) => {
	if(to.path != '/login') {
		if(to.path != '/forget') {
			store.commit('RELOAD_USERINFO_UPDATE');
			if(store.state.userInfo == null || store.state.menuInfo == null) {
				next({
					path: '/login'
				});
			} else {
				next();
			}
		} else {
			next();
		}
	} else {
		next();
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
