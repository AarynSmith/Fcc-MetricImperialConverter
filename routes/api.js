/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      let input = req.query.input;
      const rtn = {
        initNum: convertHandler.getNum(input) || 'invalid number',
        initUnit: convertHandler.getUnit(input) || 'invalid unit',
      }
      if (rtn.initNum === 'invalid number' ||
        rtn.initUnit === "invalid unit") {
        return res.json(rtn)
      }

      let returnNum = convertHandler.convert(rtn.initNum, rtn.initUnit);
      let returnUnit = convertHandler.getReturnUnit(rtn.initUnit);
      let toString = convertHandler.getString(rtn.initNum, rtn.initUnit, returnNum, returnUnit);

      res.json({
        initNum: rtn.initNum,
        initUnit: rtn.initUnit,
        returnNum,
        returnUnit,
        string: toString
      });
    });

};