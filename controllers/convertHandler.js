/*
*
*
*       Complete the handler logic below
*       
*       
*/

const {init} = require("../server");

const UnitPairs = {
  'gal': 'l',
  'l': 'gal',
  'mi': 'km',
  'km': 'mi',
  'lbs': 'kg',
  'kg': 'lbs',
};

const UnitLong = {
  'gal': 'gallons',
  'l': 'liters',
  'mi': 'miles',
  'km': 'kilometers',
  'lbs': 'pounds',
  'kg': 'kilograms',
}

function ConvertHandler() {

  this.getNum = function(input) {
    // Match any number of digits, decimals, and slashes
    let result = (input.match(/(^[\d\./]+)/) || ['1'])[0]
    // Return null if there is more than one slash
    if (result.split('/').length > 2) return null
    // Split up fractions and reduce them to a single number
    result = result.split('/').reduce((acc, v) => acc / v)
    // Return the final number or 1 if the number is invalid (3..4)
    return Number(result) || 1;
  };

  this.getUnit = function(input) {
    // Lowercase the input
    let result = input.toLowerCase().match(/([a-z]+\s*$)/)[0];
    // If the result is a valid unit return it, otherwise return null
    return (Object.keys(UnitPairs).indexOf(result) >= 0) ? result : null;
  };

  this.getReturnUnit = function(initUnit) {
    // Return the paired unit for the input
    return UnitPairs[initUnit];
  };

  this.spellOutUnit = function(unit) {
    // Return the long name for a unit
    return UnitLong[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let rtn;

    switch (initUnit) {
      case 'gal': rtn = initNum * galToL; break;
      case 'l': rtn = initNum / galToL; break;
      case 'lbs': rtn = initNum * lbsToKg; break;
      case 'kg': rtn = initNum / lbsToKg; break;
      case 'mi': rtn = initNum * miToKm; break;
      case 'km': rtn = initNum / miToKm; break;
    }

    return Number(rtn.toFixed(5))
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result =
      `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };

}

module.exports = ConvertHandler;