const handleAsync = require('../utils/handleAsync');
const orderService = require('../services/orderServices');

exports.getMyOrders = handleAsync(async (req, res, next) => {
  const userID = req.user.id;
  const orders = await orderService.getMyOrdersService(userID);

  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

exports.createOrder = handleAsync(async (req, res, next) => {
  const { bookId, quantity } = req.body;
  const orderQuantity = quantity || 1;
  const userId = req.user.id;

  const order = await orderService.createOrderService(
    bookId,
    orderQuantity,
    userId
  );

  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.cancelOrder = handleAsync(async (req, res, next) => {
  const orderId = Number(req.params.id);
  const userId = req.userId;

  const updatedOrder = await orderService.cancelOrderService(orderId, userId);

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});
