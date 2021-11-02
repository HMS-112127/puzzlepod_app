const {
    jsonResponse
} = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersModule = require('../module/users');
const users = new usersModule();


module.exports = {
    index: (req, res) => {
      
        jsonResponse(res, 'success', 'Welcome to project')
    },

    
    
    
   

    
    
    
    
}


