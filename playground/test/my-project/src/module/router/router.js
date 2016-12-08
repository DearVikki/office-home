import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;

import A from './A.vue'
import B from './B.vue'
import A2 from './A.vue'

const router = new VueRouter({
	routes: [{
  	path:'/A',
  	component:A,
    children:[
      { path: '/A2', component: A2 }
    ]
  },{
  	path: '/B',
  	component:B
  }]
})
new Vue({
  el: '#app',
  router: router
})