import common from '../../assets/js/common.js'
import h5Responsive from '../../assets/js/h5Responsive.js'
import index from './Index.vue'
import syllabus from './Syllabus.vue'
import teacher from './Teacher.vue'
import advantage from './Advantage.vue'
import part1header from './part1-header.vue';
import part10footer from './part10-footer.vue';

const router = new common.VueRouter({
	routes:[{
		path:'/',
		component:index
	},{
		path:'/syllabus',
		component:syllabus
	},{
		path:'/teacher',
		component:teacher
	},{
		path:'/advantage',
		component:advantage
	}]
	//mode:'history'
})

new common.Vue({
  el: '#app',
  router,
  components:{part1header,part10footer}
})