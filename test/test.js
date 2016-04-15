var assert = require('assert');
var http = require('http');
var supertest = require('supertest');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var app = require('../app');
var supposedJson = require('./supposedJson');

var dbconfig = require('../database/dbconfig.js');
var database = require('../database/database.js');

function getJsonAndTest(done, path, toEqual) {
  supertest(app)
  .get(path)
  // .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200)
  .end(function(err, data) {
    if (err) console.log(err);
    assert.equal(data.text, toEqual);
    done();
  });
}

describe('/v1', function() {
  describe('/device', function() {
    describe('/info', function() {

      // to test path:/v1/device/info/type_list
      describe('/type_list', function() {
        it('should return json as expected', function(done) {
          database.createPool(dbconfig).then(function() {
            getJsonAndTest(done, '/v1/device/info/type_list',
              supposedJson.device.type_list);
          });
        });
      });

      // to test path:/v1/device/info/station_list
      describe('/station_list', function() {
        it('should return json as expected', function(done) {
          getJsonAndTest(done, '/v1/device/info/station_list',
            supposedJson.device.station_list);
        });
      });
    });
  });

  // to test path:/v1/data/agri_env/current?deviceType={}&stationName={}
  describe('/data', function() {
    describe('/agri_env', function() {

      it('is queried with specified deviceType', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?deviceType=Light',
          supposedJson.agri_env.current_with_deviceName_Light);
      });

      it('is queried with specified stationName', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?stationName=A1',
          supposedJson.agri_env.current_with_stationName_A1);
      });

      it('is queried with specified deviceType and stationName', function(done) {
        getJsonAndTest(done,
          '/v1/data/agri_env/current?deviceType=Light&stationName=A1',
          supposedJson.agri_env.current_with_deviceName_Light_and_stationName_A1
        );
      });
    });
  });

  // to test path:/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_id=172&width=900&height=600
  describe('/utils', function() {
    describe('generate_graph', function() {

      it('is queried with specified start_time and end_time and **single** device_id',
      function(done) {
        var filePath = path.join(__dirname, 'supposedHtmlForGenerateGraph.html');
        fs.readFileAsync(filePath, 'utf-8')
        .then(function(data) {
          getJsonAndTest(
            done,
            '/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172&width=900&height=600',
            data
          );
        })
        .catch(function(err) {
          console.log(err);
        });
      });

      it('is queried with specified start_time and end_time and **multi** device_id',
      function(done) {
        var filePath = path.join(__dirname, 'supposedHtmlForGenerateMultiCurveGraph.html');
        fs.readFileAsync(filePath, 'utf-8')
        .then(function(data) {
          getJsonAndTest(
            done,
            '/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172;174;176;178&width=900&height=600',
            data
          );
        })
        .catch(function(err) {
          console.log(err);
        });
      });

      describe('exception handling', function() {
        it('is queried with start_time undefined', function(done) {
          getJsonAndTest(done,
            '/v1/utils/generate_graph?end_time=1443745800&devices_ids=172',
            supposedJson.utils.generate_graph.exception_handle_params_undefined
          );
        });

        it('is queried with end_time undefined', function(done) {
          getJsonAndTest(done,
            '/v1/utils/generate_graph?start_time=1443745800&devices_ids=172',
            supposedJson.utils.generate_graph.exception_handle_params_undefined
          );
        });

        it('is queried with devices_ids undefined', function(done) {
          getJsonAndTest(done,
            '/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000',
            supposedJson.utils.generate_graph.exception_handle_params_undefined
          );
        });

        it('is queried with wrong device_id, so get null database result', function(done) {
          getJsonAndTest(done,
            '/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172;171&width=900&height=600',
            supposedJson.utils.generate_graph.exception_handle_database_return_null
          );
        });
      });
    });
  });
});
