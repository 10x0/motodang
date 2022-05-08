const { Product } = require("../models");
const ErrorHandler = require("../handlers/error.handler");
const AsyncHandler = require("../handlers/async.handler");
const { Op } = require("sequelize");

exports.all = AsyncHandler(async (req, res, next) => {
  let hasQuery = Object.keys(req.query).length > 0;

  const allProducts = hasQuery
    ? await Product.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          [Op.or]: [req.query],
        },
      })
    : await Product.findAll({
        order: [["createdAt", "DESC"]],
      });
  res.status(200).json({
    success: true,
    allProducts,
  });
});

exports.create = AsyncHandler(async (req, res, next) => {
  let product = await Product.create({
    ...req.body,
    image: "/uploads/images/" + req?.file?.filename,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

exports.update = AsyncHandler(async (req, res, next) => {
  const singleProduct = await Product.findOne({
    where: { _id: req.params.id },
  });
  if (!singleProduct) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  singleProduct.name = req.body?.name;
  singleProduct.actualPrice = req.body?.actualPrice;
  singleProduct.discountedPrice = req.body?.discountedPrice;
  singleProduct.stock = req.body?.stock;
  singleProduct.category = req.body?.category;
  singleProduct.size = req.body?.size;
  singleProduct.image = "/uploads/images/" + req.file?.filename;
  await singleProduct.save();

  res.status(200).json({
    success: true,
  });
});

exports.remove = AsyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ where: { _id: req.params.id } });
  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  await product.destroy();

  res.status(200).json({
    success: true,
  });
});
