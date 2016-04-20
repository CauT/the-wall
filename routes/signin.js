'use strict'

var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var jwt = require('express-jwt');
var utility = require('./globalUtility');

var redis = require('../database/RedisWrapper').redisClient;

// no sign up allowed from device

router.use('/', function(req, res, next) {
  // req.query.name
  // req.query.password
  client.getAsync('users.password:' + req.query.username)
  .then(function(results) {
    if (results == req.query.password) {
      utility.createToken()
    }
  })
  .catch();
});

module.exports = router;
