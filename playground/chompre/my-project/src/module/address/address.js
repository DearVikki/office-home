import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import addresss from './Address.vue'

/* eslint-disable no-new */
const myheader = common.myHeader;
const myfooter = common.myFooter;

common.Vue.mixin(common.validatorMixin);
new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, addresss}
})