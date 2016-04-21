'use strict'

var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var jwt = require('express-jwt');
var utility = require('./globalUtility');

// path:/v1/signout
router.use('/', function(req, res, next) {
  res.json({
    ret: 'SUCCESS',
  });
});

module.exports = router
