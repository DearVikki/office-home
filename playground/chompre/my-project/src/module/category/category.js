import common from '../../assets/js/common.js'
import category from './Category.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;
new common.Vue({
  el: '#app',
  components:{category,myheader, myfooter}
})