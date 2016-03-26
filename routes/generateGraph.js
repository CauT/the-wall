var express = require('express');
var router = express.Router();
var database = require('../database/database');

function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

// path:/v1/utils/generateGraph?startTime={}&endTime={}&deviceId={}
// localhost:3000/v1/utils/generateGraph?startTime=1443650000&endTime=1443655000&deviceId=172
// var sql = "SELECT * FROM DEVICEHISTROY\
//   WHERE DEVICEID=172\
//   AND RECTIME BETWEEN 1443650000 AND 1443655000\
//   ORDER BY RECTIME";
var sql = "SELECT DEVICE.DEVICEID,\
	DEVICECODE,\
	DEVICENAME,\
	UNIT,\
	ANALOGYVALUE,\
	DEVICEHISTROY.RECTIME\
  FROM DEVICE INNER JOIN DEVICEHISTROY\
  ON DEVICE.DEVICEID = DEVICEHISTROY.DEVICEID\
  WHERE DEVICE.DEVICEID=172 AND DEVICEHISTROY.RECTIME\
  BETWEEN 1443650000 AND 1443655000\
  ORDER BY RECTIME";
router.get('/', function(req, res, next) {
  database.simpleExecute(
    // "SELECT * FROM DEVICEHISTROY WHERE DEVICEID="
    //   + req.query.deviceId
    //   + " AND RECTIME BETWEEN "
    //   + req.query.startTime
    //   + " AND "
    //   + req.query.endTime,
    "SELECT DEVICE.DEVICEID,\
      DEVICECODE,\
      DEVICENAME,\
      UNIT,\
      ANALOGYVALUE,\
      DEVICEHISTROY.RECTIME\
    FROM DEVICE INNER JOIN DEVICEHISTROY\
      ON DEVICE.DEVICEID = DEVICEHISTROY.DEVICEID\
    WHERE DEVICE.DEVICEID="
    + req.query.device_id
    + " AND DEVICEHISTROY.RECTIME\
      BETWEEN "
    + req.query.start_time + " AND " + req.query.end_time
    + " ORDER BY RECTIME",
    {}, //no binds
    {
      outFormat: database.OBJECT
    }
  )
  .then(function(results) {
    var x = [];
    var y = [];
    results.rows.forEach(function(row) {
      x.push(getLocalTime(row.RECTIME));
      y.push(row.ANALOGYVALUE);
    });

    res.render('graph', {
      title: '光线传感器',
      dataX: x,
      dataY: y,
      isAndroid: req.query.platform === 'Android',
    });
  })
  .catch(function(err) {
    next(err);
  });
});

module.exports = router;
