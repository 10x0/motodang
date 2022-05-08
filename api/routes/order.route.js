const express = require("express");
const { create, all, update } = require("../controllers/order.controller");

const router = express.Router();

router.route("/").post(create);
router.route("/").get(all);
router.route("/:id").put(update);

module.exports = router;
