const express = require('express');
const app = express.Router();
const api = require('../controller/api');

app.get('/', api.index);


// app.post('/insert_user',api.insert_user)



module.exports = app