const express = require("express");
const controller = require("../controllers/mongodb");
const router = express.Router();
router.route("/").get(controller.groupAllInfected);
module.exports = router;