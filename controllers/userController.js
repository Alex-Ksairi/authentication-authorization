const UserModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');

exports.login = (request, response) => {
    // console.log('The current user is: ', request.user)
    return response.render('login');
};


exports.register = (request, response) => {
    return response.render('register');
};


exports.registerUser = async(request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        const { username, firstname, lastname, email } = request.body;
    
        await UserModel.create({
            username,
            firstname,
            lastname,
            email, 
            password: hashedPassword
    });

    response.redirect('/users/login');
    } catch (error) {
        response.redirect('/users/register');
    }
};


// logout
exports.logout = (request, response) => {
    request.logOut();
    response.redirect('/users/login');
};