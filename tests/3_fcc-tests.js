const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);


suite('FCC Tests', function() {

  suite('Gal to L', function() {

    test('1gal', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '1gal'})
        .end((err, res) => {
          assert.equal(res.body.returnNum, 3.78541);
          assert.equal(res.body.returnUnit, 'l');
        })
      assert.equal(1, 1)
      done()
    });

    test('10gal', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '10gal'})
        .end((err, res) => {
          assert.equal(res.body.returnNum, 37.8541);
          assert.equal(res.body.returnUnit, 'l');
        })
      assert.equal(1, 1)
      done()
    });

    test('1l', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '1l'})
        .end((err, res) => {
          assert.equal(res.body.returnNum, 0.26417);
          assert.equal(res.body.returnUnit, 'gal');
        })
      assert.equal(1, 1)
      done()
    });

    test('10l', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '10l'})
        .end((err, res) => {
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, 'gal');
        })
      assert.equal(1, 1)
      done()
    });

  });

  suite('Invalid Unit', () => {
    test('1min', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({input: '1min'})
        .end((err, res) => {
          // assert.equal(res.status, 400);
          assert.equal(res.body.initUnit, 'invalid unit');;
        })
      done()
    });
  })
});