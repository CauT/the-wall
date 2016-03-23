var express = require('express');
var generateGraph = require('./generateGraph');
var router = express.Router();

router.use('/generateGraph', generateGraph);

module.exports = router;
