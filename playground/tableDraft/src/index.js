var Vue = require('vue');
require('./style/index.css');
var Mock = require('mockjs');
var data = Mock.mock({
	'items|40':[{
		'animal|1':['doggy','caaaaaat'],
		'legs|1':['four','我也有四条腿喔嘻嘻嘻嘻'],
		'food|1':['bones','fish'],
		'cute':true
	}]
})
var v = new Vue({
	el:'#app',
	data:{
		msg:'Hello you',
		items:data.items,
		top:'',
		left:'',
		fix:false,
		width1:'',
		width2:'',
		width3:'',
		width4:''
	},
	mounted(){
	},
	methods:{
		handleScroll(){
			if(window.scrollY > this.top) this.fix = true;
			else this.fix=false;
		}
	}
})