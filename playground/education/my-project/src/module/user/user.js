import common from '../../assets/js/common.js'
import course from './Course.vue'
import buycourse from './BuyCourse.vue'
import salary from './Salary.vue'
import freetime from './freeTime.vue'
import doc from './Doc.vue'
import userinfo from './Userinfo.vue'
import edit from './userinfoEdit.vue'
//import trial from './Trial.vue'
import question from './Question.vue'

//import VueValidator from 'vue-validator'
//common.Vue.use(VueValidator);

//判断是否登录
common.Vue.http.get('?name=education.sys.islogin').then((response)=>{
	if(response.body.code === 1004) location.href = './login.html';
	//判断个人信息是否填完整
	else if(response.body.code === 1000) {
		localStorage.setItem('user',JSON.stringify(response.body.data))
		common.Vue.http.get('?name=education.sys.is.complete.info&user_id='+response.body.data.user_id).then((response2)=>{
			if(response2.body.code === 1058 && response.body.data.user_type === 1){
				location.href = './beforeEnter.html';
			}
		})
	}
})

const myheader = common.myHeader;
const sider = common.sider;
const router = new common.VueRouter({
	routes:[{
		path:'/',
		component:course
	},{
		path:'/buycourse',
		component:buycourse
	},{
		path:'/salary',
		component:salary
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