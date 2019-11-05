if (process.env.NODE_ENV === "production") {
    module.exports = require('./configProd');
  } else {
    module.exports = require('./configDev');
  }