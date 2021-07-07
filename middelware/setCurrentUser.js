function setCurrentUser(request, response, next) {
    response.locals.currentUser = request.user;
    return next();
}

module.exports = { setCurrentUser };