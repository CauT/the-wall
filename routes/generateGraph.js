var express = require('express');
var router = express.Router();
var database = require('../database/database');

function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

// path:/v1/utils/generateGraph?startTime={}&endTime={}&deviceId={}
// localhost:3000/v1/utils/generateGraph?startTime=1443650000&endTime=1443655000&deviceId=172
var sql = "SELECT * FROM DEVICEHISTROY WHERE DEVICEID=172 AND RECTIME BETWEEN 1443650000 AND 1443655000"
router.get('/', function(req, res, next) {
  database.simpleExecute(
    "SELECT * FROM DEVICEHISTROY WHERE DEVICEID="
      + req.query.deviceId
      + " AND RECTIME BETWEEN "
      + req.query.startTime
      + " AND "
      + req.query.endTime,
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
    });
  })
  .catch(function(err) {
    next(err);
  });
});

function getEchartsOption(graphTitle, devices) {
  devices.forEach(function(device) {
    option.series.push({
      name: device.deviceId,
      type: 'line',
      stack: '总量',
      data: device.y
    });
    option.legend.data.push(device.deviceId);
  });
  return option;
}

module.exports = router;
