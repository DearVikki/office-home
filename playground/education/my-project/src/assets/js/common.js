import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//import Bus from './bus.js';
if (location.protocol != 'https:')
{
 //location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
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

Vue.http.get('?name=education.sys.islogin').then((response)=>{
	if(response.body.code === 1004 && location.pathname.slice(-10,-5)==='user') location.href = './login.html';
})

export default{
	VueRouter: VueRouter,
	Vue: Vue,
	myHeader: Myheader,
	sider: sider
}