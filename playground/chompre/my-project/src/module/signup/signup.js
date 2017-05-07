import common from '../../assets/js/common.js'
import Signup from './Signup.vue'

import Emptyheader from '../../components/EmptyHeader'
const Myfooter = common.myFooter;

common.Vue.mixin(common.validatorMixin);

new common.Vue({
  el: '#app',
  components:{Signup,Emptyheader,Myfooter}
})