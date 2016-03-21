var express = require('express');
var generateGraph = require('./generate_graph');
var router = express.Router();

router.use('/generate_graph', generateGraph);

module.exports = router;
