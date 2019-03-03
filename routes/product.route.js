const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");
router.get("/test", controller.test);

router.post("/create", controller.product_create);
router.get("/:id", controller.product_details);
router.put("/:id/update", controller.product_update);
router.delete("/:id/delete", controller.product_delete);

module.exports = router;
