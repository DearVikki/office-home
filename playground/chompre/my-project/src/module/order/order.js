import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import order from './Order.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;
const loading = common.loading;

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:'',
  	showLoading:false
  },
  components:{myheader, myfooter, order, loading}
})

common.interceptors(vm);
