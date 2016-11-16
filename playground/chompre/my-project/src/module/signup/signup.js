import Vue from 'vue'
import Signup from './Signup.vue'

import '../../assets/lib/public.less'
import Emptyheader from '../../components/EmptyHeader'
import Myfooter from '../../components/Footer'

import VueValidator from 'vue-validator'
Vue.use(VueValidator);

new Vue({
  el: '#app',
  components:{Signup,Emptyheader,Myfooter}
})