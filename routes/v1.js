var express = require('express');
var device = require('./device');
var data = require('./data');
var router = express.Router();

router.use('/device', device);
router.use('/data', data);

module.exports = router;
