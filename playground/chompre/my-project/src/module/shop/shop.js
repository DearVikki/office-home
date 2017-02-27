import common from '../../assets/js/common.js'
import shop from './Shop.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;
new common.Vue({
  el: '#app',
  components:{shop,myheader, myfooter}
})