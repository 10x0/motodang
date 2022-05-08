const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const errorMiddleware = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/uploads/images",
  express.static(path.join(__dirname + "/uploads/images"))
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorMiddleware);

module.exports = app;
