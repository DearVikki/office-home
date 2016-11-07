var Vue = require('vue');
require('./style/index.css');
var v = new Vue({
	el:'#app',
	data:{
		msg:'Hello you',
		items:[{animal:'dogggy', legs: 'four', food:'bones', cute:true},
		{animal:'caaaaaaaaaaat', legs:'fourrrrrrrrrrrrrrrrrrrrrrrrrrrr', food:'fish', cute:true}

		]
	}
})
console.log(v)