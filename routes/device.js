var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

// var {
//   oracledb_conn_settings: conn_settings
// } = require("../settings.json");
var connSettings = require("../settings.json").oracledbConnSettings;

var getKindOfDeviceList = "SELECT DISTINCT DEVICENAME FROM DEVICE ORDER BY DEVICENAME";

router.get('/info/kind_list', function(req, res, next) {
  oracledb.getConnection(
    connSettings,
    function(err, connection)
    {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(
        getKindOfDeviceList,
        function(err, result)
        {
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
