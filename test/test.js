var assert = require('assert');
var http = require('http');

var supposedJson = {
  type_list: '[["(Water Level"],["Air Temp"],["B1(Soil Temp)"],["DO0"],["DO1"],["DO2"],["DO3"],["DO4"],["DO5"],["DO6"],["DO7"],["E2(Soil Hum)"],["Light"],["Soil Hum"],["Soil Salt"],["Soil Temp"],["Water Level"]]',
  station_list: '[["A1"],["B1"],["B2"],["B3"],["DO"],["E1"],["E2"]]',
}
var options = {
  hostname: 'localhost',
  port: 3000,
  method: 'GET'
};

describe('/v1', function() {
  describe('/device', function() {
    describe('/info', function() {
      describe('/type_list', function() {
        it('should return json as expected:', function(done) {
          options.path = '/v1/device/info/type_list';
          var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
              console.log('BODY: ' + chunk);
              assert.equal(chunk, supposedJson.type_list);
              done();
            })
          });
          req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
          req.end();
        });
      });
      describe('/station_list', function() {
        it('should return json as expected:', function(done) {
          options.path = '/v1/device/info/station_list';
          var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
              console.log('BODY: ' + chunk);
              assert.equal(chunk, supposedJson.station_list);
              done();
            })
          });
          req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
          req.end();
        });
      });
    });
  });
});
