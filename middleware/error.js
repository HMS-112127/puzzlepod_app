const winston = require('winston');

module.exports = (err, req, res, next) => {
    console.log('err', err);
    console.log('errormessage', err.message);
    // winston.error(err.message, err);
    let statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message);
    // return next();
}