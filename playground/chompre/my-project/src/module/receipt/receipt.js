import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import receipt from './Receipt.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;

common.Vue.mixin(common.validatorMixin);

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, receipt}
})
