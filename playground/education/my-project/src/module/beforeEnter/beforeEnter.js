import common from '../../assets/js/common.js'
import beforeenter from './BeforeEnter.vue'

const myheader = common.myHeader;
new common.Vue({
  el: '#app',
  components:{beforeenter,myheader}
})