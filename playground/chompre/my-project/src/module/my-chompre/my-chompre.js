import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import Order from './Order.vue'
import Addresss from './Address.vue'
import Receipt from './Receipt.vue'
import Pw from './Reset-pw.vue'
import side from './Side.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;
const loading = common.loading;

const router = new common.VueRouter({
	base: '/webpage/',
	routes:[{
		path: '/',
		component: Order
	},{
		path: '/order',
		component: Order
	},{
		path: '/address',
		component: Addresss
	},{
    path: '/addressEdit',
    component: Addresss
  },{
		path: '/receipt',
		component: Receipt
	},{
    path: '/receiptEdit',
    component: Receipt
  },{
    path:'/pw',
    component: Pw
  }]
})


common.Vue.mixin(common.validatorMixin);

var vm = new common.Vue({
  el: '#app',
  data: {
  	showLoading:false
  },
  mounted(){
  },
  computed:{
  	type(){
  		let type;
  		switch(this.$route.path){
  			case '/':
  				type = 1;
  				break;
  			case '/order':
  				type = 1;
  				break;
  			case '/address':
  				type = 2;
  				break;
        case '/addressEdit':
          type = 2;
          break;
  			case '/receipt':
  				type = 3;
  				break;
        case '/receiptEdit':
          type = 3;
          break;
  			case '/pw':
  				type = 4;
  				break;
  			case '/info':
  				type = 5;
  				break;
  		}
  		return type;
  	}
  },
  router: router,
  components:{myheader, myfooter, Order, loading, side, Addresss, Receipt}
})

// common.interceptors(vm);
