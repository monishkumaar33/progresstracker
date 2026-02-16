const express = require('express');
const router = express.Router();

const userController = require('./controller/usercontroller');
const { validateSignup, validateLogin } = require('./middleware/validators');

// User routes
router.post('/signup', validateSignup, userController.postuser);
router.post('/login', validateLogin, userController.loginuser);

module.exports = router;