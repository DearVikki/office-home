import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import questiondetail from './Question-detail.vue'

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{questiondetail}
})