import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import h5Common from './h5Common.js'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://xn--mts40cuzfs54d.com/broker/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;
import '../lib/public.less'


export default{
	VueRouter: VueRouter,
	Vue: Vue
}