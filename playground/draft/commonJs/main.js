var add = require('./add');

delete require.cache['./add'];
require('./add').hh = 'haha'
console.log(require.main === module)

//console.log('main.js', require('./add.js').x);
//console.log('main.js', require('./add2.js').x);