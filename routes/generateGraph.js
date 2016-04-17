'use strict'

var express = require('express');
var router = express.Router();
var oracle = require('../database/OracleWrapper');
var Promise = require('bluebird');

function getLocalTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString();
}

function renderGraph(req, res, filtereds) {
  var x = [];
  var ys = [];
  var titles = [];

  filtereds[0].forEach(function(row) {
    x.push(getLocalTime(row.RECTIME));
  });

  filtereds.forEach(function(filtered){
    if (filtered[0] == undefined)
      // even if at least one of multi query was succeed
      // fast-fail is essential for secure
      throw new Error('数据库返回结果为空');
    var y = [];
    filtered.forEach(function(row) {
      y.push(row.ANALOGYVALUE);
    });
    ys.push(y);
    titles.push(filtered[0].DEVICENAME + ': ' + filtered[0].DEVICECODE);
  });

  res.render('graph', {
    titles: titles,
    dataX: x,
    dataY: ys,
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
        resolve(filtered);
        process.nextTick(function() {
          oracle.releaseConnection(connection);
        });
      } else if (rows.length > 0) {
        filtered.push(rows[0]);
        resFilter(resolve, reject, connection, resultSet, numRows, filtered);
      }
    }
  );
}

function createQuerySingleDeviceDataPromise(req, res, device_id, start_time, end_time) {
  return oracle.getConnection()
  .then(function(connection) {
    return oracle.execute(
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
        device_id,
        start_time,
        end_time
      ],
      {
        outFormat: oracle.OBJECT,
        resultSet: true
      },
      connection
    )
    .then(function(results) {
      var filtered = [];
      var filterGap = Math.floor(
        (end_time - start_time) / (120 * 100)
      );
      return new Promise(function(resolve, reject) {
        resFilter(resolve, reject,
          connection, results.resultSet, filterGap, filtered);
      });
    })
    .catch(function(err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
      process.nextTick(function() {
        oracle.releaseConnection(connection);
      });
    });
  });
}

function secureCheck(req, res) {
  let qry = req.query;

  if (
    qry.device_ids == undefined
    || qry.start_time == undefined
    || qry.end_time == undefined
  ) {
    throw new Error('device_ids或start_time或end_time参数为undefined');
  }

  if (req.query.end_time < req.query.start_time) {
    throw new Error('终止时间小于起始时间');
  }
};

// TODO: prevent SQL injection
router.get('/', function(req, res, next) {
  try {
    var device_ids;
    var queryPromises = [];

    secureCheck(req, res);

    device_ids = req.query.device_ids.toString().split(';');

    for(let i=0; i<device_ids.length; i++) {
      queryPromises.push(createQuerySingleDeviceDataPromise(
        req, res, device_ids[i], req.query.start_time, req.query.end_time));
    };

    Promise.all(queryPromises)
    .then(function(filtereds) {
      renderGraph(req, res, filtereds);
    }).catch(function(err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    })
  } catch(err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
