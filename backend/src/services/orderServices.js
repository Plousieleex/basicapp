const prisma = require('../config/db');
const AppError = require('../utils/appError');

exports.getMyOrdersService = async (userID) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userID },
      include: {
        orderItems: {
          include: {
            book: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  } catch (e) {
    throw new AppError('Error retrieving orders.', 500);
  }
};

exports.createOrderService = async (bookId, orderQuantity, userId) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: userId,
        status: 'PENDING',
        orderItems: {
          create: {
            bookId: bookId,
            quantity: orderQuantity,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  } catch (e) {
    throw new AppError('Error proccessing purchase.', 500);
  }
};

exports.cancelOrderService = async (orderId, userId) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    if (order.userId !== userId) {
      throw new AppError('You are not authorized to cancel this order.', 403);
    }

    if (order.status !== 'PENDING') {
      throw new AppError('Only pending orders can be cancelled.', 400);
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });

    return updatedOrder;
  } catch (e) {
    throw new AppError('Error cancelling order.', 500);
  }
};
