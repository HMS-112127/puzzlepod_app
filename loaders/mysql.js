const mysql = require('mysql');
require('dotenv').config()
const util = require('util');

//saving array
module.exports = async () => {
    delete global;
    global = [];
    global.dbconfig = {
        connectionLimit: 120,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        
        password: '',
        database:process.env.MYSQL_DATABASE
    };
    let handleDisconnect = () => {
        global.connect = mysql.createPool(global.dbconfig);
        global.connect.getConnection((err, connection) => {
            if (err) {
                console.log('mySQLPool Error', err, err.message);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                    handleDisconnect();
                } else if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                    handleDisconnect();
                } else if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                    handleDisconnect();
                } else if (err.code === 'ETIMEDOUT') {
                    console.error('Database Error Timed out');
                    handleDisconnect();
                } else {
                    console.error('Database Error Unknown', err);
                }
            }
            if (connection) {
                console.log("MYSQL Database Connected")
                connection.release()
            }
            return
        });
        global.connect.query = util.promisify(global.connect.query)
        global.mysql = global.connect;
    }
    handleDisconnect();
    return global;
}