import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
import '../lib/public.less'
import Myheader from '../../components/Header'
import Myfooter from '../../components/Footer'

export default{
	VueRouter: VueRouter,
	Vue: Vue,
	myHeader: Myheader,
	myFooter: Myfooter
}