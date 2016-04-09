var express = require('express');
var router = express.Router();
var database = require('../database/database');

var lastDate = '';

function getLocalTime(nS) {
  var now = new Date(parseInt(nS) * 1000).toLocaleString();
  if (lastDate.substring(0, 10) == now.substring(0, 10)) {
    lastDate = now;
    return now.substring(11);
  } else {
    lastDate = now;
    return now;
  }
}

router.get('/', function(req, res, next) {
  database.simpleExecute(
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
    lastDate = '';
    results.rows.forEach(function(row) {
      x.push(getLocalTime(row.RECTIME));
      y.push(row.ANALOGYVALUE);
    });

    res.render('graph', {
      title: '光线传感器',
      dataX: x,
      dataY: y,
      isAndroid: req.query.platform === 'Android',
      height: req.query.height == undefined ? 200 : req.query.height,
      width: req.query.width == undefined ? 300 : req.query.width,
    });
  })
  .catch(function(err) {
    next(err);
  });
});

router.get('/fuckAndroid', function(req, res, next) {

});

module.exports = router;
