var redis = require('redis');
var dbconfig = require('../Config').redis;
var redisClient = redis.createClient(dbconfig.socket);
var Promise = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

redisClient.on('error', function (err) {
  console.log('Error ' + err);
});

redisClient.on('connect', function () {
  console.log('Redis is ready');
});

exports.redis = redis;
exports.redisClient = redisClient;
