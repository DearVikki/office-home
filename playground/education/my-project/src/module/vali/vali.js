import Vue from 'vue'
import vali from './Vali.vue'
import VueValidator from 'vue-validator'

Vue.use(VueValidator);

new Vue({
  el: '#app',
  components:{vali}
})