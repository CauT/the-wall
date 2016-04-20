var express = require('express');
var router = express.Router();

var device = require('./device');
var data = require('./data');
var utils = require('./utils');
var signin = require('./signin');

router.use('/device', device);
router.use('/data', data);
router.use('/utils', utils);
router.use('/signin', signin);

module.exports = router;
