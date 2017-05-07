import common from '../../assets/js/common.js'
import Login from './Login.vue'

import Emptyheader from '../../components/EmptyHeader'
const myfooter = common.myFooter;

common.Vue.mixin(common.validatorMixin);
new common.Vue({
  el: '#app',
  components:{Login,Emptyheader,myfooter}
})