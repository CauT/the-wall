var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

var connSettings = require("../settings.json").oracledbConnSettings;

var getListofDeviceType =
  "select distinct devicename from device order by devicename";
var getListofStationId =
  "select name from station order by name";

// path:/v1/device/info/type_list
router.get('/info/type_list', function(req, res, next) {
  oracledb.getConnection(
    connSettings,
    function(err, connection) {
      if (err) {
        console.error(err.message);
        res.send(err.message);
        return;
      }
      connection.execute(
        getListofDeviceType,
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

// path:/v1/device/info/station_list
router.get('/info/station_list', function(req, res, next) {
  oracledb.getConnection(
    connSettings,
    function(err, connection) {
      if (err) {
        console.error((err.message));
        res.send(err.message);
        return;
      }
      connection.execute(
        getListofStationId,
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
