import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Page1 from './Page1'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter({
	routes:[{
		path:'',
		component: App
	},
	{
		path:'/page1',
		component: Page1
	}],
	mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router
})
