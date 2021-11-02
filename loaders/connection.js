const http = require('http');
require('dotenv').config()

const port =process.env.PORT;

module.exports = async (app) => {
    const server = http.createServer(app).listen(port);
    server.setTimeout(540000);
    console.log("Server is Running on http://localhost:" + port);

    return app;
};