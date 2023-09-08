const express = require('express');
const wibondController = require("../Controllers/wibondController.js");

const router = express.Router();

router.route('/')
    .get(wibondController.createPaymentInt)

module.exports = router;
