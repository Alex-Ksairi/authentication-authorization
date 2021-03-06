function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    return response.redirect('/users/login');
};


function checkNotAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return response.redirect('/home');
    }
    return next()
};

module.exports = { checkAuthenticated, checkNotAuthenticated }