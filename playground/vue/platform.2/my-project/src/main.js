import Vue from 'vue'
import App from './App'
import Add from './Add'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'expose?$!expose?jQuery!jquery'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/semantic-ui-css/semantic.min.js'
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
/* eslint-disable no-new */
const router = new VueRouter({
	routes:[{
		path:'',
		component: App
	},{
		path:'/add',
		component:Add
	}],
	mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  data(){
  	return {
  		allActive:true,
  		addActive:false
  	}
  },
  methods:{
  	navClass(){
  		if(location.href.slice(-3,-1)==='ad') this.allActive = false;
  		else this.allActive = true;
  	}
  },
  mounted(){
  	//this.navClass()
  },
  watch: {
    //this.navClass()
 }
})
