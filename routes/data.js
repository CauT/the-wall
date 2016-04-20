var express = require('express');
var router = express.Router();
var agriEnv = require('./agriEnv');

router.use('/agri_env', agriEnv);

module.exports = router;
