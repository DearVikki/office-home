function route(request, response, pathname, handle) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        response.write('no request found');
        response.end();
    }
};
exports.route = route;