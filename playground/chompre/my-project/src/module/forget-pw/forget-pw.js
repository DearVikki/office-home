import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Forgetpw from './Forget-pw.vue'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
import '../../assets/lib/public.less'
import Emptyheader from '../../components/EmptyHeader'
import Myfooter from '../../components/Footer'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

import VueValidator from 'vue-validator'
Vue.use(VueValidator);

const router = new VueRouter({
	routes: [{
  	path:'/Step1',
  	component:Step1
  },{
  	path: '/Step2',
  	component:Step2
  },{
    path: '/Step3',
    component: Step3
  }]
})
new Vue({
  el: '#app',
  router: router,
  components:{Emptyheader,Myfooter}
})