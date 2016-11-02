import Vue from 'vue'
import index from './Index'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);

import './assets/lib/public.less'
import Myheader from './components/Header'
import Myfooter from './components/Footer'
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
  data: {
  	msg:'xxxx'
  },
  router: router,
  components:{Myheader,Myfooter}
})
