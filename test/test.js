var assert = require('assert');
var http = require('http');

var supposedJson = {
  device: {
    type_list: '[{"DEVICENAME":"(Water Level"},{"DEVICENAME":"Air Temp"},{"DEVICENAME":"B1(Soil Temp)"},{"DEVICENAME":"DO0"},{"DEVICENAME":"DO1"},{"DEVICENAME":"DO2"},{"DEVICENAME":"DO3"},{"DEVICENAME":"DO4"},{"DEVICENAME":"DO5"},{"DEVICENAME":"DO6"},{"DEVICENAME":"DO7"},{"DEVICENAME":"E2(Soil Hum)"},{"DEVICENAME":"Light"},{"DEVICENAME":"Soil Hum"},{"DEVICENAME":"Soil Salt"},{"DEVICENAME":"Soil Temp"},{"DEVICENAME":"Water Level"}]',
    station_list: '[{"NAME":"A1"},{"NAME":"B1"},{"NAME":"B2"},{"NAME":"B3"},{"NAME":"DO"},{"NAME":"E1"},{"NAME":"E2"}]',
  },
  agri_env: {
    current_with_deviceName_Light: '[{"DEVICECODE":"A1GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"A1GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"B1GZ1","DEVICENAME":"Light","VALUE":19370.188000000002,"UNIT":"Lux"},{"DEVICECODE":"B1GZ2","DEVICENAME":"Light","VALUE":724.1875,"UNIT":"Lux"},{"DEVICECODE":"B2GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"B2GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"B3GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"B3GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"E1GZ1","DEVICENAME":"Light","VALUE":42043.75,"UNIT":"Lux"},{"DEVICECODE":"E1GZ2","DEVICENAME":"Light","VALUE":785.875,"UNIT":"Lux"},{"DEVICECODE":"E2GZ1","DEVICENAME":"Light","VALUE":18026.938000000002,"UNIT":"Lux"},{"DEVICECODE":"E2GZ2","DEVICENAME":"Light","VALUE":970.4375,"UNIT":"Lux"}]',
    current_with_stationName_A1: '[{"DEVICECODE":"A1GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"A1GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"A1KW","DEVICENAME":"Air Temp","VALUE":-20.18125,"UNIT":"C"},{"DEVICECODE":"A1SW","DEVICENAME":"Water Level","VALUE":0.0010625,"UNIT":"m"},{"DEVICECODE":"A1TS","DEVICENAME":"Soil Hum","VALUE":0,"UNIT":"%"},{"DEVICECODE":"A1TW","DEVICENAME":"Soil Temp","VALUE":0,"UNIT":"C"},{"DEVICECODE":"A1TY","DEVICENAME":"Soil Salt","VALUE":0.01875,"UNIT":"mS/cm"}]',
    current_with_deviceName_Light_and_stationName_A1: '[{"DEVICECODE":"A1GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"A1GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"}]',
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
      // to test path:/v1/device/info/type_list
      describe('/type_list', function() {
        it('should return json as expected:', function(done) {
          getJsonAndTest(done, '/v1/device/info/type_list',
            supposedJson.device.type_list);
        });
      });
      // to test path:/v1/device/info/station_list
      describe('/station_list', function() {
        it('should return json as expected:', function(done) {
          getJsonAndTest(done, '/v1/device/info/station_list',
            supposedJson.device.station_list);
        });
      });
    });
  });
  // to test path:/v1/data/agri_env/current?deviceType={}&stationName={}
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
        getJsonAndTest(done,
          '/v1/data/agri_env/current?deviceType=Light&stationName=A1',
          supposedJson.agri_env.current_with_deviceName_Light_and_stationName_A1
        );
      });
    });
  });
});
