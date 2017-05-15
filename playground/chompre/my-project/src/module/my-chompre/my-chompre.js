import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import Order from './Order.vue'
import OrderDetail from './Order-detail.vue'
import Addresss from './Address.vue'
import Receipt from './Receipt.vue'
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
	}]
})

var vm = new common.Vue({
  el: '#app',
  data: {
  	showLoading:false,
  	type:0
  },
  mounted(){
  	console.log(this.$route.path)
  	console.log(this.$route)
  },
  computed:{
  	type(){
  		let type;
  		switch(this.$route.path){
  			case '/':
  				type = 0;
  				break;
  			case '/order':
  				type = 1;
  				break;
  			case '/address':
  				type = 2;
  				break;
  			case '/receipt':
  				type = 3;
  				break;
  			case '/pw':
  				type = 4;
  				break;
  			case '/info':
  				type = 5;
  				break;
  		}

  	}
  },
  router: router,
  components:{myheader, myfooter, Order, loading, side, Addresss}
})

// common.interceptors(vm);
