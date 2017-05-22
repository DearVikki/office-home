import common from '../../assets/js/common.js'
import banner from './Home-banner.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;

//import VueValidator from 'vue-validator'
//common.Vue.use(VueValidator);

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, banner}
})