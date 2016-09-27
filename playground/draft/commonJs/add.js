module.exports = function(a,b){
	return a*b;
}
console.log(require.main === module)
exports.x = 'b1';
//console.log('add.js', require('./add2.js').x);
exports.x = 'b2';