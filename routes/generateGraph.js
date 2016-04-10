var express = require('express');
var router = express.Router();
var database = require('../database/database');
var Promise = require('es6-promise').Promise;

var lastDate = '';
var numRows = 10;

function getLocalTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString();
}

function renderGraph(req, res, rows) {
  var x = [];
  var y = [];
  rows.forEach(function(row) {
    x.push(getLocalTime(row.RECTIME));
    y.push(row.ANALOGYVALUE);
  });

  res.render('graph', {
    title: '光线传感器',
    dataX: x,
    dataY: y,
    height: req.query.height == undefined ? 200 : req.query.height,
    width: req.query.width == undefined ? 300 : req.query.width,
  });
}

function resFilter(resolve, reject, connection, resultSet, numRows, filtered) {
  resultSet.getRows(
    numRows,
    function (err, rows)
    {
      if (err) {
        console.log(err.message);
        reject(err);
      } else if (rows.length == 0) {
        console.log("rows is end of file");
        resolve(filtered);
        process.nextTick(function() {
          database.releaseConnection(connection);
        });
      } else if (rows.length > 0) {
        filtered.push(rows[0]);
        resFilter(resolve, reject, connection, resultSet, numRows, filtered);
      }
    }
  );
}

// TODO: prevent SQL injection
router.get('/', function(req, res, next) {
  database.getConnection()
  .then(function(connection) {
    database.execute(
      "SELECT\
        DEVICE.DEVICEID,\
        DEVICECODE,\
        DEVICENAME,\
        UNIT,\
        ANALOGYVALUE,\
        DEVICEHISTROY.RECTIME\
      FROM\
        DEVICE INNER JOIN DEVICEHISTROY\
      ON\
        DEVICE.DEVICEID = DEVICEHISTROY.DEVICEID\
      WHERE\
        DEVICE.DEVICEID = :device_id\
        AND DEVICEHISTROY.RECTIME\
        BETWEEN :start_time AND :end_time\
      ORDER\
        BY RECTIME",
      [
        req.query.device_id,
        req.query.start_time,
        req.query.end_time
      ],
      {
        outFormat: database.OBJECT,
        resultSet: true
      },
      connection
    )
    .then(function(results) {
      var filtered = [];
      var filterGap = Math.floor(
        (req.query.end_time - req.query.start_time) / (120 * 100)
      );
      console.log(filterGap);
      return new Promise(function(resolve, reject) {
        resFilter(resolve, reject,
          connection, results.resultSet, filterGap, filtered);
      });
    })
    .then(function(filtered) {
      renderGraph(req, res, filtered);
    })
    .catch(function(err) {
      console.log(err);
      process.nextTick(function() {
        database.releaseConnection(connection);
      });
    });
  }).catch(function(err) {
    console.log(err);
    process.nextTick(function() {
      database.releaseConnection(connection);
    });
  });
});

module.exports = router;
