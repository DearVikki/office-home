import common from '../../assets/js/common.js'
import '../../assets/lib/personalModule.less'
import searchshop from './Search-shop.vue'
/*const router = new common.VueRouter({
	routes:[{
		path:'index.html',
		component: index
	}],
	mode:'history'
})*/
/* eslint-disable no-new */
const myheader = common.myHeader;
const myfooter = common.myFooter;

new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{myheader, myfooter, searchshop}
})