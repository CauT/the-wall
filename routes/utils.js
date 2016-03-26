var express = require('express');
var generateGraph = require('./generateGraph');
var router = express.Router();

router.use('/generate_graph', generateGraph);

module.exports = router;
