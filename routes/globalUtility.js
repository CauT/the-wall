'use strict'

var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var ms = require('ms');
var redisClient = require('../database/RedisWrapper');
var config = require('../Config');

Promise.promisifyAll(jwt);

var redisTokenKeyPrefix = 'unexpired.token:';
var tokenExpireTime = '1 ms';
var tokenExistedFlag = 1;

function createSHA256(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64');
}

function createToken(username) {
  return jwt.sign(
    {username: username},
    config.jwt_secret,
    {expiresIn: ms(tokenExpireTime)}
  );
}

function verifyToken(token) {
  return jwt.verifyAsync(token, config.jwt_secret);
    // .then(function(decoded) {
    //     return decoded;
    // });
}

module.exports = {
  createSHA256,
  createToken,
  verifyToken,
  redisTokenKeyPrefix,
};
