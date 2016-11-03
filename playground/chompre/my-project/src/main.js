import Vue from 'vue'
import index from './Index'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
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
