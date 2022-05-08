const express = require("express");
const {
  create,
  all,
  update,
  remove,
} = require("../controllers/product.controller");

const router = express.Router();

const upload = require("../handlers/upload.handler");

router.route("/").get(all);
router.route("/").post(upload.single("image"), create);
router.route("/:id").put(upload.single("image"), update).delete(remove);

module.exports = router;
