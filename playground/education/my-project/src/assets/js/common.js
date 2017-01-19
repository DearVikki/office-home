import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//import Bus from './bus.js';
if (location.protocol != 'https:')
{
  location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'https://www.hzchuangxiangzhe.cn/php/PcApi';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;
import '../lib/public.less'
import Myheader from '../../components/Header'
import sider from '../../components/Sider'

export default{
	VueRouter: VueRouter,
	Vue: Vue,
	myHeader: Myheader,
	sider: sider
}