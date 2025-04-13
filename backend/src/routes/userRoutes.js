const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/myProfile')
  .get(authMiddleware.protect, userController.getUserProfile);

module.exports = router;
