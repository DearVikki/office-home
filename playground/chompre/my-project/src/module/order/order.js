import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import order from './Order.vue'
import loading from '../../components/Loading.vue';

const myheader = common.myHeader;
const myfooter = common.myFooter;

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:'',
  	showLoading:false
  },
  components:{myheader, myfooter, order, loading}
})

common.Vue.http.interceptors.push((request, next) => {
    vm.showLoading = true
    next((response) => {
        vm.showLoading = false
        return response;
    });
});