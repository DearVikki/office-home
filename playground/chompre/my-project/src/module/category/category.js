import common from '../../assets/js/common.js'
import category from './Category.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;
const router = new common.VueRouter()

new common.Vue({
  el: '#app',
  router: router,
  components:{category,myheader, myfooter}
})