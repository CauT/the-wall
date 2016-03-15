var express = require('express');
var device = require('./device');
var router = express.Router();

router.use('/device', device);

module.exports = router;
