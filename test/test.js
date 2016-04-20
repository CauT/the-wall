var assert = require('assert');
var http = require('http');
var supertest = require('supertest');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var app = require('../app');
var supposedJson = require('./supposedJson');

var dbconfig = require('../Config').oracle;
var oracle = require('../database/OracleWrapper');
var redis = require('../database/RedisWrapper').redisClient;
var utility = require('../routes/globalUtility');

describe('/v1', function() {
  describe('/device', function() {
    describe('/info', function() {

      // to test path:/v1/device/info/type_list
      describe('/type_list', function() {
        it('should return json as expected', function(done) {
          oracle.createPool(dbconfig).then(function() {
            supertest(app)
            .get('/v1/device/info/type_list')
            .expect(200)
            .end(function(err, data) {
              if (err) console.log(err);
              assert.equal(data.text, supposedJson.device.type_list);
              done();
            });
            });
          });
        });
      });

      // to test path:/v1/device/info/station_list
      describe('/station_list', function() {
        it('should return json as expected', function(done) {
          supertest(app)
          .get('/v1/device/info/station_list')
          .expect(200)
          .end(function(err, data) {
            if (err) console.log(err);
            assert.equal(data.text, supposedJson.device.station_list);
            done();
          });
        });
      });
    });
  });

  // to test path:/v1/data/agri_env/current?deviceType={}&stationName={}
describe('/data', function() {
  describe('/agri_env', function() {

    it('is queried with specified deviceType', function(done) {
      supertest(app)
      .get('/v1/data/agri_env/current?deviceType=Light')
      .expect(200)
      .end(function(err, data) {
        if (err) console.log(err);
        assert.equal(data.text, supposedJson.agri_env.current_with_deviceName_Light);
        done();
      });
    });

    it('is queried with specified stationName', function(done) {
      supertest(app)
      .get('/v1/data/agri_env/current?stationName=A1')
      .expect(200)
      .end(function(err, data) {
        if (err) console.log(err);
        assert.equal(data.text, supposedJson.agri_env.current_with_stationName_A1);
        done();
      });
    });

    it('is queried with specified deviceType and stationName', function(done) {
      supertest(app)
      .get('/v1/data/agri_env/current?deviceType=Light&stationName=A1')
      .expect(200)
      .end(function(err, data) {
        if (err) console.log(err);
        assert.equal(data.text, supposedJson.agri_env.current_with_deviceName_Light_and_stationName_A1);
        done();
      });
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
      .then(function(toEqual) {
        supertest(app)
        .get('/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172&width=900&height=600')
        .expect(200)
        .end(function(err, data) {
          if (err) console.log(err);
          assert.equal(data.text, toEqual);
          done();
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    });

    it('is queried with specified start_time and end_time and **multi** device_id',
    function(done) {
      var filePath = path.join(__dirname, 'supposedHtmlForGenerateMultiCurveGraph.html');
      fs.readFileAsync(filePath, 'utf-8')
      .then(function(toEqual) {
        supertest(app)
        .get('/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172;174;176;178&width=900&height=600')
        .expect(200)
        .end(function(err, data) {
          if (err) console.log(err);
          assert.equal(data.text, toEqual);
          done();
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    });

    describe('exception handling', function() {
      it('is queried with start_time undefined', function(done) {
        supertest(app)
        .get('/v1/utils/generate_graph?end_time=1443745800&devices_ids=172')
        .expect(500)
        .end(function(err, data) {
          if (err) console.log(err);
          assert.equal(data.text, supposedJson.utils.generate_graph.exception_handle_params_undefined);
          done();
        });
      });

      it('is queried with end_time undefined', function(done) {
        supertest(app)
        .get('/v1/utils/generate_graph?start_time=1443745800&devices_ids=172')
        .expect(500)
        .end(function(err, data) {
          if (err) console.log(err);
          assert.equal(data.text, supposedJson.utils.generate_graph.exception_handle_params_undefined);
          done();
        });
      });

      it('is queried with devices_ids undefined', function(done) {
        supertest(app)
        .get('/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000')
        .expect(500)
        .end(function(err, data) {
          if (err) console.log(err);
          assert.equal(data.text, supposedJson.utils.generate_graph.exception_handle_params_undefined);
          done();
        });
      });

      it('is queried with wrong device_id, so get null oracle result', function(done) {
        supertest(app)
        .get('/v1/utils/generate_graph?start_time=1443745800&end_time=1443760000&device_ids=172;171&width=900&height=600')
        .expect(500)
        .end(function(err, data) {
          if (err) console.log(err);
          assert.equal(data.text, supposedJson.utils.generate_graph.exception_handle_database_return_null);
          done();
        });
      });
    });
  });
});

describe('global utility', function() {
  describe('token', function() {
    var tmpToken;
    describe('function createToken()', function() {
      it('should create a token', function() {
        tmpToken = utility.createToken('userForTest');
        assert.equal(typeof(tmpToken), 'string');
      });
    });

    describe('function verifyToken()', function() {
      it('should verify a token', function(done) {
        assert(typeof(tmpToken), 'string');
        utility.verifyToken(tmpToken)
        .then(function(obj) {
          assert(typeof(obj), 'object');
          console.log(obj);
          done();
        });
      });
    });

  });
});
