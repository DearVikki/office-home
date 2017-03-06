import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import myfooter from '../../components/Footer.vue'
import answer from './User-answer.vue'

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{answer,myfooter}
})