import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import myfooter from '../../components/Footer.vue'
import recommend from './User-recommend.vue'

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{recommend,myfooter}
})