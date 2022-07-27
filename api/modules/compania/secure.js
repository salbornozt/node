const auth = require('../../../auth/index')

module.exports = function(event) {
    function middleware(req, resp, next) {
        switch (event) {
            case 'list':
                auth.verify(req);
                next();
                break;
            case 'insert':
                auth.verify(req);
                next();
                break;
            case 'update':
                auth.verify(req);
                next();
                break;
            case 'get':
                auth.verify(req);
                next();
                break;
            case 'delete':
                auth.verify(req);
                next();
                break;
            default:
                next();
                break;
        }

    }
    return middleware;
}