import common from '../../assets/js/common.js'
import product from './Product.vue'
/*const router = new common.VueRouter({
	routes:[{
		path:'index.html',
		component: index
	}],
	mode:'history'
})*/
/* eslint-disable no-new */
const myheader = common.myHeader;
const myfooter = common.myFooter;

//import VueValidator from 'vue-validator'
//common.Vue.use(VueValidator);

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, product}
})