const express = require('express');
const wibondController = require("../Controllers/wibondController.js");

const router = express.Router();

router.route('/')
    .post(wibondController.createLinkPayment)
module.exports = router;
