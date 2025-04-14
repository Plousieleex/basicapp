const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware.protect, orderController.getMyOrders);
router
  .route('/purchase')
  .post(authMiddleware.protect, orderController.createOrder);

module.exports = router;
