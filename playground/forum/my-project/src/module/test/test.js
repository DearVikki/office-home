import common from '../../assets/js/common.js'
import test from './Test.vue'

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{test}
})
