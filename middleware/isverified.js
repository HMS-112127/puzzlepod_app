const {
    jsonResponse
} = require("../controller/commonController");
// const usercont = require("../controller/userController");
const usersModule = require('../module/users');
const users = new usersModule();

const isverified = async (req, res, next) => {
    try {
        let [results] = await Promise.all([users.signInWithEmail(req)])
        if(results[0].isverified != "True"){
            jsonResponse(res, "Please Check your email for verification link");
            throw new Error("Please Check your email for verification link");
        }
        next();

    } catch (error) {
        console.log(error);
    }
};

module.exports = isverified;