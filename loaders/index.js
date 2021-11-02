const expressLoader = require('./express');
const mysqlLoader = require('./mysql');
const routesLoader = require('./routes');
const connectionLoader = require('./connection');

module.exports = async (app) => {
    await mysqlLoader();
    await expressLoader(app);
    await routesLoader(app);
    await connectionLoader(app);
};