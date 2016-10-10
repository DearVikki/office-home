function times(a, b) {
    return a * b;
}
module.exports = times;

//turn this commonjs into an AMD module
/*define(function(require, exports, module) {
    function times(a, b) {
        return a * b;
    }
    module.exports = times;
})*/