import common from '../../assets/js/common.js'
import more from './Home-more.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;

//import VueValidator from 'vue-validator'
//common.Vue.use(VueValidator);

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, more}
})