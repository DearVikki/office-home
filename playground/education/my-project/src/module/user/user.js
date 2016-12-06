import common from '../../assets/js/common.js'
import user from './Userinfo.vue'


const myheader = common.myHeader;
const sider = common.sider;
/*const router = new common.VueRouter({
	routes:[{
		path:'/user.html',
		component: user
	}],
	mode:'history'
})*/
new common.Vue({
  el: '#app',
  components:{user, myheader, sider}
})