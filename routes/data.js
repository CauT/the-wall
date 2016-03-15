var express = require('express');
var agriEnv = require('agri-env');
var router = express.Router();

router.use('/agri-env', agriEnv);

module.exports = router;
