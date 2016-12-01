import common from '../../assets/js/common.js'
import Login from './Login.vue'

import Emptyheader from '../../components/EmptyHeader'
const myfooter = common.myFooter;

import VueValidator from 'vue-validator'
common.Vue.use(VueValidator);

new common.Vue({
  el: '#app',
  components:{Login,Emptyheader,myfooter}
})

//为什么MyHeader和MyFooter会不行呢 不都是rename吗？