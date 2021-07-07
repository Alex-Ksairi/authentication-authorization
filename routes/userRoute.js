const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const passport = require('passport');
const currentUser = require('../middelware/setCurrentUser');

// logout
router.use(currentUser.setCurrentUser);
router.get('/logout', controller.logout);

// middleware
const auth = require('../middelware/auth');
router.use(auth.checkNotAuthenticated);

router.get('/login', controller.login);
router.get('/register', controller.register);
router.post('/register', controller.registerUser);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true
}));

module.exports = router;