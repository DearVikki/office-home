import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import myfooter from '../../components/Footer.vue'
import personalinfo from './User-personalInfo.vue'

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{personalinfo,myfooter}
})