var express = require("express");
var router = express.Router();

var userController = require("./index");

const { check } = require('express-validator/check');

router.post("/create", userController.create_user);

module.exports = router;