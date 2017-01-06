import common from '../../assets/js/common.js'
import course from './Course.vue'
import freetime from './freeTime.vue'
import doc from './Doc.vue'
import userinfo from './Userinfo2.vue'
import edit from './userinfoEdit.vue'
//import trial from './Trial.vue'
import question from './Question.vue'

//import VueValidator from 'vue-validator'
//common.Vue.use(VueValidator);
//判断是否登录
common.Vue.http.get('?name=education.sys.islogin').then((response)=>{
	if(response.body.code === 1004) location.href = './login.html';
})

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
	}
	// ,{
	// 	path:'/trial',
	// 	component:trial
	// }
	,{
		path:'/question',
		component:question
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