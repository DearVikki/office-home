import common from '../../assets/js/common.js'

import Emptyheader from '../../components/EmptyHeader'
const Myfooter = common.myFooter;
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import lang from '../../assets/js/language.js';

common.Vue.mixin(common.validatorMixin);
const router = new common.VueRouter({
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
new common.Vue({
  el: '#app',
  router: router,
  data:{
    lang:lang
  },
  components:{Emptyheader,Myfooter}
})