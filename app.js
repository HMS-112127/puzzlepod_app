// Index File
const loaders = require('./loaders');
const express = require('express');

let startServer = async () => {
    const app = express();
    await loaders(app);
    
}

startServer();