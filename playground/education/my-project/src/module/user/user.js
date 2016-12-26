import common from '../../assets/js/common.js'
import course from './Course.vue'
import freetime from './freeTime.vue'
import doc from './Doc.vue'
import userinfo from './Userinfo.vue'
import edit from './userinfoEdit.vue'
import trial from './Trial.vue'

//import VueValidator from 'vue-validator'
//common.Vue.use(VueValidator);

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
		component:userinfo,
		children:[{
			path:'edit',
			component:edit
		}]
	},{
		path:'/usercenterEdit',
		component:edit
	},{
		path:'/trial',
		component:trial
	}]
	//mode:'history'
})
console.log(router)
new common.Vue({
  el: '#app',
  router,
  methods:{
  	changeName(){
  		console.log('hey')
  	}
  },
  components:{userinfo, myheader, sider}
})