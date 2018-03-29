import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import paysuccess from './Pay-success.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, paysuccess}
})