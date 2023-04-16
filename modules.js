// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const calc = require('./test-module-1');
const newCalc = new calc();
console.log(newCalc.add(1, 2));

//exports

// const testCalc = require('./test-module-2');
const { add } = require('./test-module-2');
console.log(add(2, 2));

// caching
// see how the top level code in this module doesnt get cslled three times. That's caching.
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();