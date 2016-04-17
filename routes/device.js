var express = require('express');
var router = express.Router();
var oracle = require('../database/OracleWrapper');

var getListofDeviceType =
  "select distinct devicename from device order by devicename";
var getListofStationId =
  "select name from station order by name";

// path:/v1/device/info/type_list
router.get('/info/type_list', function(req, res, next) {
    oracle.simpleExecute(
      getListofDeviceType,
      {}, //no binds
      {
        outFormat: oracle.OBJECT
      }
    )
      .then(function(results) {
        res.json(results.rows);
      })
      .catch(function(err) {
        next(err);
      });
});

// path:/v1/device/info/station_list
router.get('/info/station_list', function(req, res, next) {
    oracle.simpleExecute(
      getListofStationId,
      {}, //no binds
      {
        outFormat: oracle.OBJECT
      }
    )
      .then(function(results) {
        res.json(results.rows);
      })
      .catch(function(err) {
        next(err);
      });
});

module.exports = router;
