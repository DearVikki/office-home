import Vue from 'vue'
import App from './App'
import Add from './Add'
import UeditorTest from './UeditorTest'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'expose?$!expose?jQuery!jquery'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/semantic-ui-css/semantic.min.js'
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
const href = location.href.split('//')[1].split('/');
href.splice(0,1);
if(href[href.length] !== '') href.splice(-1,1);

const baseHref = '/'+href.join('/')+'/';
/* eslint-disable no-new */
const router = new VueRouter({
	routes:[
  {
    path:'*/',
    component: App
  },
  {
		path:'*/add',
		component:Add
	}
  ],
	mode:'history'
  //base:baseHref
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
  		if(this.$route.path.slice(1) === 'add') this.allActive = false;
  		else this.allActive = true;
  	}
  },
  mounted(){
  	this.navClass()
  },
  watch: {
    '$route' (to) {
      this.navClass();
    }
 }
})
