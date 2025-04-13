const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/signup').post(authController.signUpUserController);

router.route('/signin').post(authController.signInUserController);

module.exports = router;
