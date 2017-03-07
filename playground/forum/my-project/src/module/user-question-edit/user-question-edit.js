import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import questionedit from './User-question-edit.vue'

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{questionedit}
})