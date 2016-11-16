import Vue from 'vue'
import Login from './Login.vue'

import '../../assets/lib/public.less'
import Emptyheader from '../../components/EmptyHeader'
import Myfooter from '../../components/Footer'

import VueValidator from 'vue-validator'
Vue.use(VueValidator);

new Vue({
  el: '#app',
  components:{Login,Emptyheader,Myfooter}
})

//为什么MyHeader和MyFooter会不行呢 不都是rename吗？