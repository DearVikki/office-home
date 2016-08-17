var http = require('http');
var url = require('url');
var formidable = require("formidable");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(request, response, pathname, handle);
    }
    http.createServer(onRequest).listen(8888);
}
exports.start = start;