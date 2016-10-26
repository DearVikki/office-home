import Vue from 'vue'

import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'expose?$!expose?jQuery!jquery'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/semantic-ui-css/semantic.min.js'
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
import VuetablePaginationDropdown  from 'vuetable-2/src/components/VuetablePaginationDropdown.vue';

//import vueUI from 'vue-ui'
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination)
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)

//Vue.use(vueUI);
//Vue.http.options.emulateJSON = true;
//Vue.http.options.root = 'http://mozhishi.com/shopping/php/PcApi'
const router = new VueRouter({
	routes:[{
		path:'',
		component: App
	}],
	mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router
})
