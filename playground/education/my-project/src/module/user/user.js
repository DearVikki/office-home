import common from '../../assets/js/common.js'
import course from './Course.vue'
import freetime from './freeTime.vue'
import doc from './Doc.vue'
import user from './Userinfo.vue'

import VueValidator from 'vue-validator'
common.Vue.use(VueValidator);

const myheader = common.myHeader;
const sider = common.sider;
const router = new common.VueRouter({
	routes:[{
		path:'/',
		component:course
	},{
		path:'/course',
		component:course
	},{
		path:'/freetime',
		component:freetime
	},{
		path:'/doc',
		component:doc
	},{
		path:'/usercenter',
		component:user
	}]
	//mode:'history'
})
console.log(router)
new common.Vue({
  el: '#app',
  router,
  components:{user, myheader, sider}
})