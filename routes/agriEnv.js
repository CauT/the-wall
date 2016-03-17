var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

var connSettings = require("../settings.json").oracledbConnSettings;

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
  oracledb.getConnection(
    connSettings,
    function(err, connection) {
      if (err) {
        console.error((err.message));
        res.send(err.message);
        return;
      }
      connection.execute(
        getCurrentValueOfSelectedDevices(req.query.deviceType, req.query.stationName),
        function(err, result) {
          if (err) {
            console.error(err.message);
            res.send(err.message);
            return;
          }
          res.send(result.rows);
      });
  });
});

module.exports = router;
