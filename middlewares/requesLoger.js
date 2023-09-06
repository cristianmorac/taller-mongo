export function requestLogger(req, res, next) {
    console.log('method', req.method);
    console.log('Path', req.path);
    next()
}