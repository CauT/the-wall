var express = require('express');
var router = express.Router();
var oracle = require('../database/OracleWrapper');

var getCurrentValueOfSelectedDevicesSQL = function(deviceType, stationName) {
  var sql = "SELECT DEVICECODE,DEVICENAME,VALUE,UNIT FROM DEVICE";
  var orderBy = " ORDER BY DEVICECODE";
  if (deviceType === undefined && stationName === undefined) {
    return sql + orderBy;
  } else if (deviceType !== undefined && stationName !== undefined) {
    return sql
      + " WHERE DEVICENAME="
      + "\'"
      + deviceType
      + "\'"
      + " AND "
      + "DEVICECODE LIKE \'"
      + stationName
      + "%\'"
      + orderBy;
  } else if (deviceType !== undefined) {
    return sql
      + " WHERE DEVICENAME="
      + "\'"
      + deviceType
      + "\'"
      + orderBy;
  } else if (stationName !== undefined) {
    return sql
      + " WHERE DEVICECODE LIKE \'"
      + stationName
      + "%\'"
      + orderBy;
  }
}

function getHistoryValueOfSelectedDeviceSQL(deviceType, stationName, startTime,
  endTime) {
  var sql = 'SELECT\
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
    WHERE';
  if (deviceType !== undefined) {
    sql = sql + ' AND DEVICE.DEVICENAME = ' + "\'" + deviceType + "\'";
  }
  if (stationName !== undefined) {
    sql = sql + ' AND DEVICE.DEVICECODE LIKE ' + "\'" + stationName + '%' + "\'";
  }
  if (endTime !== undefined) {
    sql = sql + ' AND DEVICEHISTROY.RECTIME BETWEEN '
    + startTime
    + ' AND '
    + endTime;
  }
  sql = sql + ' ORDER BY RECTIME';

  var reg = new RegExp('WHERE.AND');
  return sql.replace(reg, 'WHERE');
}

// path:/v1/data/agri_env/current?deviceType={}&stationName={}
router.get('/current', function(req, res, next) {
  oracle.simpleExecute(
    getCurrentValueOfSelectedDevicesSQL(req.query.deviceType, req.query.stationName),
    {}, //no binds
    {
      outFormat: oracle.OBJECT
    }
  )
  .then(function(results) {
    res.json(results.rows);
  })
  .catch(function(err) {
    next(err);
  });
});

// path:/v1/data/agri_env/history?deviceType={}&stationName={}&time={}
router.get('/history', function(req, res, next) {
  if (req.query.time === undefined) {
    res.status(500).json({
      status: 'error',
      message: '时间不能为空'
    });
    next();
  }

  var deviceType = req.query.deviceType;
  var stationName = req.query.stationName;
  var endTime = req.query.time;
  var startTime = endTime - 62;

  oracle.getConnection()
  .then(function(connection) {
    return oracle.execute(
      getHistoryValueOfSelectedDeviceSQL(deviceType, stationName, startTime,
        endTime),
      {},
      {
        outFormat: oracle.OBJECT,
      },
      connection
    )
    .then(function(results) {
      res.json(results.rows);
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
});

module.exports = router;
