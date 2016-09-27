require.config({
	path: {
		'math' : 'math.js'
	}
})

require(['math'], function(add){
	alert(add(1,1))
})

require(['math'], function(add){
	alert(add(1,1))


})