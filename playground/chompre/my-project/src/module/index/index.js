import common from '../../assets/js/common.js'
import index from './index.vue'
const router = new common.VueRouter({
	routes:[{
		path:'*/index.html',
		component: index
	}],
	mode:'history'
})
/* eslint-disable no-new */
const myheader = common.myHeader;
const myfooter = common.myFooter;
new common.Vue({
  el: '#app',
  data: {
  	msg:'xxxx'
  },
  router: router,
  components:{myheader, myfooter}
})
