var assert = require('assert');
var http = require('http');

var supposedJson = {
  device: {
    type_list: '[["(Water Level"],["Air Temp"],["B1(Soil Temp)"],["DO0"],["DO1"],["DO2"],["DO3"],["DO4"],["DO5"],["DO6"],["DO7"],["E2(Soil Hum)"],["Light"],["Soil Hum"],["Soil Salt"],["Soil Temp"],["Water Level"]]',
    station_list: '[["A1"],["B1"],["B2"],["B3"],["DO"],["E1"],["E2"]]',
  },
  agri_env: {
    current_with_deviceName_Light: '[["A1GZ1","Light",1000,"Lux"],["A1GZ2","Light",0,"Lux"],["B1GZ1","Light",19370.188000000002,"Lux"],["B1GZ2","Light",724.1875,"Lux"],["B2GZ1","Light",1000,"Lux"],["B2GZ2","Light",0,"Lux"],["B3GZ1","Light",1000,"Lux"],["B3GZ2","Light",0,"Lux"],["E1GZ1","Light",42043.75,"Lux"],["E1GZ2","Light",785.875,"Lux"],["E2GZ1","Light",18026.938000000002,"Lux"],["E2GZ2","Light",970.4375,"Lux"]]',
    current_with_stationName_A1: '[["A1GZ1","Light",1000,"Lux"],["A1GZ2","Light",0,"Lux"],["A1KW","Air Temp",-20.18125,"C"],["A1SW","Water Level",0.0010625,"m"],["A1TS","Soil Hum",0,"%"],["A1TW","Soil Temp",0,"C"],["A1TY","Soil Salt",0.01875,"mS/cm"]]',
    current_with_deviceName_Light_and_stationName_A1: '[["A1GZ1","Light",1000,"Lux"],["A1GZ2","Light",0,"Lux"]]',
  }
}
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
      console.log('BODY: ' + chunk);
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
      describe('/type_list', function() {
        it('should return json as expected:', function(done) {
          getJsonAndTest(done, '/v1/device/info/type_list', supposedJson.device.type_list);
        });
      });
      describe('/station_list', function() {
        it('should return json as expected:', function(done) {
          getJsonAndTest(done, '/v1/device/info/station_list', supposedJson.device.station_list);
        });
      });
    });
  });
  // path:/v1/data/agri_env/current?deviceType={}&stationName={}
  describe('/data', function() {
    describe('/agri_env', function() {
      it('query with specified deviceType:', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?deviceType=Light',
          supposedJson.agri_env.current_with_deviceName_Light);
      });
      it('query with specified stationName:', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?stationName=A1',
          supposedJson.agri_env.current_with_stationName_A1);
      });
      it('query with specified deviceType and stationName:', function(done) {
        getJsonAndTest(done, '/v1/data/agri_env/current?deviceType=Light&stationName=A1',
          supposedJson.agri_env.current_with_deviceName_Light_and_stationName_A1);
      });
    });
  });
});
