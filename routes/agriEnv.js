var express = require('express');
var router = express.Router();
var database = require('../database/database.js');

var getCurrentValueOfSelectedDevices = function(deviceType, stationName) {
  var sql = "select devicecode,devicename,value,unit from device";
  var orderBy = " ORDER BY DEVICECODE";
  if (deviceType === undefined && stationName === undefined) {
    return sql + orderBy;
  } else if (deviceType !== undefined && stationName !== undefined) {
    return sql
      + " where devicename="
      + "\'"
      + deviceType
      + "\'"
      + " and "
      + "devicecode like \'"
      + stationName
      + "%\'"
      + orderBy;
  } else if (deviceType !== undefined) {
    return sql
      + " where devicename="
      + "\'"
      + deviceType
      + "\'"
      + orderBy;
  } else if (stationName !== undefined) {
    return sql
      + " where devicecode like \'"
      + stationName
      + "%\'"
      + orderBy;
  }
}

// path:/v1/data/agri_env/current?deviceType={}&stationName={}
router.get('/current', function(req, res, next) {
  database.simpleExecute(
    getCurrentValueOfSelectedDevices(req.query.deviceType, req.query.stationName),
    {}, //no binds
    {
      outFormat: database.OBJECT
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
