const { Order } = require("../models");
const ErrorHandler = require("../handlers/error.handler");
const AsyncHandler = require("../handlers/async.handler");

exports.all = AsyncHandler(async (req, res, next) => {
  const allOrders = await Order.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({
    success: true,
    allOrders,
  });
});

exports.create = AsyncHandler(async (req, res, next) => {
  let order = await Order.create(req.body);
  console.log(order);

  res.status(201).json({
    success: true,
  });
});
exports.update = AsyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
    where: { _id: req.params.id },
  });
  if (!order) {
    return next(new ErrorHandler("Order not found.", 404));
  }
  order.status = req.body.status;
  await order.save();

  res.status(201).json({
    success: true,
  });
});
