'use strict'

var express = require('express');
var router = express.Router();
var database = require('../database/database');
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
  var device_ids;

  (function secureCheck() {
    let qry = req.query;

    if (
      qry.device_ids == undefined
      || qry.start_time == undefined
      || qry.end_time == undefined
    ) {
      throw new Error('device_ids或start_time或end_time参数为undefined');
    } else {
     device_ids = req.query.device_ids.toString().split(';');  
    }

    if (req.query.end_time < req.query.start_time) {
      throw new Error('终止时间小于起始时间');
    }
  })();

  var queryPromises = [];

  function createQuerySingleDeviceDataPromise(device_id, start_time, end_time) {
    return database.getConnection()
    .then(function(connection) {
      return database.execute(
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
          outFormat: database.OBJECT,
          resultSet: true
        },
        connection
      )
      .then(function(results) {
        if (results == undefined)
          // even if at least one of multi query was succeed
          // fast-fail is essential for secure
          throw new Error('数据库返回结果为空');
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
        console.log(err);
        process.nextTick(function() {
          database.releaseConnection(connection);
        });
      });
    });
  }

  for(let i=0; i<device_ids.length; i++) {
    queryPromises.push(createQuerySingleDeviceDataPromise(
      device_ids[i], req.query.start_time, req.query.end_time));
  };

  Promise.all(queryPromises)
  .then(function(filtereds) {
    renderGraph(req, res, filtereds);
  })
});

module.exports = router;
