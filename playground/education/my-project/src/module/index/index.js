import common from '../../assets/js/common.js'
import h5Responsive from '../../assets/js/h5Responsive.js'
import index from './Index.vue'
import syllabus from './Syllabus.vue'
import part1header from './part1-header.vue';

const router = new common.VueRouter({
	routes:[{
		path:'/',
		component:index
	},{
		path:'/syllabus',
		component:syllabus
	}]
	//mode:'history'
})

new common.Vue({
  el: '#app',
  router,
  components:{part1header}
})