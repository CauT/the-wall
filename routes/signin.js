'use strict'

var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var jwt = require('express-jwt');
var utility = require('./globalUtility');

var client = require('../database/RedisWrapper').redisClient;

// no sign up allowed from device

// path:/v1/signin
router.use('/', function(req, res, next) {
  // req.query.name
  // req.query.password
  client.getAsync(utility.redisPasswordKeyPrefix + req.query.username)
  .then(function(results) {
    console.log(results);
    if (results == req.query.password) {
      res.json({
        v: '1.0',
        ret: {
          status: 'SUCCESS',
        },
        token: utility.createToken(req.query.username),
      });
    } else {
      res.json({
        v: '1.0',
        ret: {
          status: 'ERROR',
          error_code: 1,
          // message: '登陆失败，账号或密码错误'
        }
      });
    }
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
