var express = require('express');
var router = express.Router();
var database = require('../database/database.js');

var getListofDeviceType =
  "select distinct devicename from device order by devicename";
var getListofStationId =
  "select name from station order by name";

// path:/v1/device/info/type_list
router.get('/info/type_list', function(req, res, next) {
    database.simpleExecute(
      getListofDeviceType,
      {}, //no binds
      {
        outFormat: database.ARRAY
      }
    )
      .then(function(results) {
        res.send(results.rows);
      })
      .catch(function(err) {
        next(err);
      });
});

// path:/v1/device/info/station_list
router.get('/info/station_list', function(req, res, next) {
    database.simpleExecute(
      getListofStationId,
      {}, //no binds
      {
        outFormat: database.ARRAY
      }
    )
      .then(function(results) {
        res.send(results.rows);
      })
      .catch(function(err) {
        next(err);
      });
});

module.exports = router;
