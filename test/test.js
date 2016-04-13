var assert = require('assert');
var http = require('http');
var supposedJson = require('./supposedJson');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var options = {
  hostname: 'localhost',
  port: 3000,
  method: 'GET'
};

function getJsonAndTest(done, path, equal) {
  options.path = path;
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      assert.equal(chunk, equal);
      done();
    })
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
}

describe('/v1', function() {
  describe('/device', function() {
    describe('/info', function() {
      // to test path:/v1/device/info/type_list
      describe('/type_list', function() {
        it('should return json as expected', function(done) {
          getJsonAndTest(done, '/v1/device/info/type_list',
            supposedJson.device.type_list);
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
      it('query with specified deviceType', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?deviceType=Light',
          supposedJson.agri_env.current_with_deviceName_Light);
      });
      it('query with specified stationName', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?stationName=A1',
          supposedJson.agri_env.current_with_stationName_A1);
      });
      it('query with specified deviceType and stationName', function(done) {
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
      it('query with specified start_time and end_time and **single** device_id',
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
      it('query with specified start_time and end_time and **multi** device_id',
      function(done) {
        var filePath = path.join(__dirname, 'supposedHtmlForGenerateMultiCurveGraph.html');
        fs.readFileAsync(filePath, 'utf-8')
        .then(function(data) {
          getJsonAndTest(
            done,
            'http://localhost:3000/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172;174;176;178&width=900&height=600',
            data
          );
        })
        .catch(function(err) {
          console.log(err);
        });
      });
    });
  });
});
