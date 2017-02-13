import common from '../../assets/js/common.js'
import createorder from './Create-order.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, createorder}
})