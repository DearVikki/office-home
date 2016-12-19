import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://www.hzchuangxiangzhe.cn/php/PcApi';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;
import '../lib/public.less'
//import '../lib/smartBtn.less'
import Myheader from '../../components/Header'
import sider from '../../components/Sider'

export default{
	VueRouter: VueRouter,
	Vue: Vue,
	myHeader: Myheader,
	sider: sider
}