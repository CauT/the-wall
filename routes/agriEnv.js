var express = require('express');
var router = express.Router();

router.use('/data', agriEnv);

module.exports = router;
