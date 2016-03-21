var express = require('express');
var device = require('./device');
var data = require('./data');
var utils = require('./utils');
var router = express.Router();

router.use('/device', device);
router.use('/data', data);
router.use('/utils', utils);

module.exports = router;
