var requiredAuthentication = function(req, res, next) {
    if (req.mySession.user) {
        next();
    } else {
        req.mySession.error = 'Access denied!';
        res.redirect('/login');
    }
}

module.exports.requiredAuthentication = requiredAuthentication;
