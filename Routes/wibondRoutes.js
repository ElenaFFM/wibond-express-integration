const express = require('express');
const wibondController = require("../Controllers/wibondController.js");

const router = express.Router();

router.route('/')
    .post(wibondController.createPaymentInt)

module.exports = router;
