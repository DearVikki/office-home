import Vue from 'vue'
import Login from './Login.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;

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