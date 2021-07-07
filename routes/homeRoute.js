const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController');

const currentUser = require('../middelware/setCurrentUser');
// logout
router.use(currentUser.setCurrentUser);

// middleware
const auth = require('../middelware/auth');

router.get('/', controller.home);
router.get('/list', auth.checkAuthenticated, controller.list);

module.exports = router;