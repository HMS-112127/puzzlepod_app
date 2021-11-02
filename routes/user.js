const express = require('express');
const app = express.Router();
const user=require('../controller/userController')



app.get('/users', user.users);
app.get('/singleuser/:user_id', user.singleUser);
app.post('/',user.insert_user)
app.post('/email', user.signInWithEmail)
app.get('/get_user/:user_id',user.get_user)
app.post('/otp/:user_id',user.signInWithOtp)
app.get('/check_number/:num',user.check_number)
app.post('/verifyotp',user.verifyOtp)
app.post('/linktoemail/:user_id', user.sendlinktoemail)
app.post('/verifing/:id/:token/:isUser', user.verifyemail)
app.post('/verifyresetlink/:id/:token', user.verifyresetlink)
app.post('/resetpass/:email', user.resetpass)
app.post('/updatepass/:password/:email', user.updatepass)
app.post("/signup", user.signup);
app.post('/updateUser/:user_id',user.updateUser)

module.exports = app