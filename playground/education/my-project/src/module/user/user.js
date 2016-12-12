import common from '../../assets/js/common.js'
import user from './doc.vue'

import VueValidator from 'vue-validator'
common.Vue.use(VueValidator);

const myheader = common.myHeader;
const sider = common.sider;
const router = new common.VueRouter({
	routes:[{
		path:'/user',
		component: user
	}],
	mode:'history'
})
new common.Vue({
  el: '#app',
  components:{user, myheader, sider}
})