var express = require('express');
var agriEnv = require('./agriEnv');
var router = express.Router();

router.use('/agri_env', agriEnv);

module.exports = router;
