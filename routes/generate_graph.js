var express = require('express');
var router = express.Router();

function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

// path:/v1/generate-graph?startTime={}&endTime={}&sensorId={}
var sql = "SELECT * FROM DEVICEHISTROY WHERE DEVICEID=172 AND RECTIME BETWEEN 1443650000 AND 1443655000"
router.get('/', function(req, res, next) {
  oracledb.getConnection(
    connSettings,
    function(err, connection) {
      if (err) {
        console.error((err.message));
        res.send(err.message);
        return;
      }
      connection.execute(
        sql,
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
