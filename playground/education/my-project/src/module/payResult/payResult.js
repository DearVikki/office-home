import common from '../../assets/js/common.js'
import success from './Success.vue'
import fail from './Fail.vue'

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
const router = new common.VueRouter({
	routes:[{
		path:'/success',
		component:success
	},{
		path:'/fail',
		component:fail
	}]
	//mode:'history'
})

new common.Vue({
  el: '#app',
  router,
  methods:{
  	changeName(){
  		console.log('hey')
  	}
  },
  components:{myheader}
})