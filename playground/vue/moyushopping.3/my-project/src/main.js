import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import index from './index'
import mobileView from './assets/js/mobileView.js'
import publicLess from './assets/style/public.less'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.root = 'http://mozhishi.com/shopping/php/PcApi'
const router = new VueRouter({
	routes:[{
		path:'',
		component: index
	}],
	mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router
})
