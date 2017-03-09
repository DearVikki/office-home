import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'

import switchtab from '../../components/Switchtab.vue'
import myfooter from '../../components/Footer.vue'
import notice from './Notice.vue'
import msg from './Msg.vue'

const router = new common.VueRouter({
	routes:[{
		path:'/notice',
		component: notice
	},{
		path:'/msg',
		component:msg
	}]
})

var vm = new common.Vue({
  el: '#app',
  data:{
  	tabs:[{
  		content:'通知',
  	},{
  		content:'私信'
  	}]
  },
  router:router,
  methods:{
  	clickTab(i){
  		console.log(i)
  	}
  },
  components:{notice,msg,switchtab,myfooter}
})