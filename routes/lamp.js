var express = require("express");

var router = express.Router();

const lampController = require("../controllers/lamp");

/* GET home page. */
router.get("/", function (req, res, next) {
  return lampController.get(req, res);
});
router.get("/switch/:topic", function (req, res, next) {
  return lampController.switch(req, res);
});

module.exports = router;
