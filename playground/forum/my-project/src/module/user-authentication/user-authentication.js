import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import myfooter from '../../components/Footer.vue'
import authentication from './User-authentication.vue'

const validatorMixin = common.validatorMixin;
common.Vue.mixin(validatorMixin);

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{authentication,myfooter}
})