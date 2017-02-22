import common from '../../assets/js/common.js'
import createorder from './Create-order.vue'

const myheader = common.myHeader;
const myfooter = common.myFooter;
const validatorMixin = common.validatorMixin;

common.Vue.mixin(validatorMixin);

new common.Vue({
  el: '#app',
  // mixins: [validatorMixin],
  data: {
  	msg:''
  },
  components:{myheader, myfooter, createorder}
})