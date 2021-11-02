const {
    jsonResponse
} = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

// const accountSid=process.env.ACCOUNTSID;
// const authToken=process.env.AUTHTOKEN;

// const client=require('twilio')(accountSid,authToken)
const usersModule = require('../module/users');
const users = new usersModule();


var otp=0;

module.exports = {

    users: async (req, res) => {
        try {
         
            let [results] = await Promise.all([users.getUsersDetails()])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    singleUser: async (req, res) => {
        try {

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([users.getUser(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    insert_user: async (req, res) => {
        try {
            // req.body.name= "product111"
      
            let [results] = await Promise.all([users.insert_user(req)])
            jsonResponse(res, "User inserted", results)
        
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    signup: async (req, res) => {
        try {
            let [existingUser] = await Promise.all([users.signInWithEmail(req)])
            if(existingUser!=''){
                jsonResponse(res, "User Already Exists")
            }

            else {
                const password = req.body.password;
                const confirmPassword = req.body.confirmPassword;
                if(password!==confirmPassword){
                    jsonResponse(res, "Passwords do not match")
                }
                else{
                    // req.body.password = await bcrypt.hash(password,12);
                    let [results] = await Promise.all([users.signup(req)])
                    let [results1] = await Promise.all([users.signInWithEmail(req)])
      
                    const id=results1[0]?.id;
                    const token = jwt.sign({email:results1[0].email, id:results1[0].id} , "secretkey" , {expiresIn:"30d"})                
                    jsonResponse(res, "User Created", {token,id})
                }

                
            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    signInWithOtp: async (req, res) => {
        try {
            otp=Math.floor((Math.random() * 999999) + 000000);
            // req.body.name= "product111"
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results1] = await Promise.all([users.getUser(req)])
            // console.log(results,'inside sigin')
            // if(results.data.phone_no=== req.body.phone_no){
            if(results1!=''){
                client.messages
                .create({
                    body:`This is your OTP ${otp} for login to Construction Flow `,
                    from:'+14154964979',
                    to: "+91"+results1[0].phone_no
                })
                .then(message=>console.log(message.sid))
                jsonResponse(res, "OTP SENT");
            }
            else  {
                jsonResponse(res, "User doesn't exists with that phone no");

            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    verifyOtp: async (req, res) => {
        
        try {
            if(req.body.otp==otp){
                let [results] = await Promise.all([users.signInWithOtp(req)])
             
                jsonResponse(res, "User signed In", results);

            }
            else{
                jsonResponse(res,"please send correct otp");
            }
        
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },

    check_number: async (req, res) =>{
        try {
            let [results] = await Promise.all([users.check_num(req)])
            
            const id=results[0]?.id;
            const isUser=results[0]?.isUser;
            const token = jwt.sign({email:results[0].email, id:results[0].id} , "secretkey" , {expiresIn:"30d"})
            if(results.length>0){
                jsonResponse(res, "present",{token,id,isUser})
            }
            else{
                jsonResponse(res,"not_present")
            }
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },

    googlsignup: async (req, res) => {
        try {
            let [existingUser] = await Promise.all([users.signInWithgoogle(req)])
            if(existingUser.length>0){
                jsonResponse(res, "User Already Exists")
            }
            else {
                    let [results] = await Promise.all([users.signupgoogle(req)])
                    let [results1] = await Promise.all([users.signInWithgoogle(req)])
                    const id=results1[0]?.id;
                    const token = jwt.sign({email:results1[0].email, id:results1[0].id} , "secretkey" , {expiresIn:"30d"})
                    // if(req.body.isUser){
                    //     let[s]=await Promise.all([notification.create_user(JSON.stringify(id),"user")])
                    // }
                    // else
                    // {
                    //     let[s]=await Promise.all([notification.create_user(JSON.stringify(id),"vendor")])
                    // }
                                   
                    await Promise.all([notification.setnotification(id,"App","Download our new app from Playstore")])
                    jsonResponse(res, "User Created", {token,id})

                
            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    signInWithgoogleEmail: async (req, res) => {
        try {
            let [results] = await Promise.all([users.signInWithgoogle(req)])
            let check_dict= {0:false , 1 : true}
            if(req.body.isUser === check_dict[results[0].isUser])
            {   
                const id=results[0].id;
                const token = jwt.sign({email:results[0].email, id:results[0].id} , "secretkey" , {expiresIn:"30d"})
                // let [result1]=await Promise.all([notification.find_user(JSON.stringify(results[0].id))])  
                jsonResponse(res, "User signed In", {token,id})                
                
                       
            }
            else
            {
                jsonResponse(res, "Type Incorrect");
            }
            if(results[0].isverified != "True"){
                jsonResponse(res, "plz verify email by visting the link")
            }           
        
        } catch (error) {
            console.log(error)
            jsonResponse(res, "User doesn't exists", error);
        };
    },

    sendlinktoemail: async (req,res) => {
        try {
        var date = new Date();
        console.log(req.params.user_id)
        var id = req.params.user_id
        let [results1] = await Promise.all([users.getUser(id)])
        var mail = {
                    "id": results1[0].id,
                    "created": date.toString()
                    }

        const token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '30d' });
        var isUser=results1[0].isUser;

        var url = process.env.FRONTEND_PORT + "/verify/"+id+"/" + token_mail_verification + "/" + isUser;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajeevrr0512@gmail.com',
                pass: 'Rajeev@123'
            },
    
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'rajeevrr0512@gmail.com', // sender address
            to: results1[0].email, // list of receivers seperated by comma
            subject: "Account Verification", // Subject line
            text: "Click on the link below to veriy your account " + url, // plain text body
        }, (error, info) => {
    
            if (error) {
                console.log(error)
                return;
            }
            console.log('Message sent successfully!');
            console.log(info);
            jsonResponse(res, "link send");
            transporter.close();
        });
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    verifyemail: async (req, res) => {
        try {
            token = req.params.token;
            if (token) {
                    jwt.verify(token, "samsingh9892885@gmail.com", async (e, decoded) => {
                        if (e) {
                            console.log(e)
                            res.sendStatus(403)
                        } else {
                            id = decoded.id;
                            req.params.id = id;
                            let [results2] = await Promise.all([users.updateFlag(req)]);
                            let isUser=req.params.isUser
                            jsonResponse(res, "verified", {results2,isUser});
                        }
                    });
            } else {
                res.sendStatus(403)
            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },

    resetpass: async (req, res) => {
        try {
            console.log(req.params,"email")
        var date = new Date();
        let [results1] = await Promise.all([users.getuserbyemail(req)])
        var id=results1[0].id;
        var isUser=results1[0].isUser;
        var mail = {
                    "id": results1[0].id,
                    "created": date.toString()
                    }
        token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", { expiresIn: '1d' });

        var url = process.env.FRONTEND_PORT + "/resetpass/"+id+"/" + token_mail_verification + "/" + isUser ;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "rajeevrr0512@gmail.com", // username for your mail server
                pass: "Rajeev@123", // password
            },
    
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'rajeevrr0512@gmail.com', // sender address
            to: results1[0].email, // list of receivers seperated by comma
            subject: "Reset", // Subject line
            text: "Click on the link below to reset your password " + url, // plain text body
        }, (error, info) => {
    
            if (error) {
                console.log(error)
                return;
            }
            console.log('Message sent successfully!');
            console.log(info);
            jsonResponse(res, "Reset link send");
            transporter.close();
        });
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },

    verifyresetlink: async (req, res) => {
        try {
            token = req.params.token;
            if (token) {
                    jwt.verify(token, "samsingh9892885@gmail.com", async (e, decoded) => {
                        if (e) {
                            console.log(e)
                            res.sendStatus(403)
                        } else {
                            id = decoded.id;
                            req.body.id = id;
                            console.log(token_mail_verification);
                            await Promise.all([users.save_token(token_mail_verification,req)]);

                            jsonResponse(res, "reset link verified");
                        }
                    });
            } else {
                res.sendStatus(403)
            }
        
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    updatepass: async (req, res) => {
        try {
            
            let [results1] = await Promise.all([users.getuserbyemail(req)])
            
            // let sqlpassword=results1[0].password;
            // const isPasswordCorrect =await bcrypt.compare(req.body.oldpassword,sqlpassword)
            // console.log(results1[0].reset_token,"reset token");
            // console.log(token_mail_verification,"token verificatiuon");
            if (results1[0].reset_token !== " ") {
                let newpassword=req.params.password;
                let password =await bcrypt.hash(newpassword,12)
                let [results2] = await Promise.all([users.updatepass(password,req)]);
                jsonResponse(res, "password reset successfull");
                let [clear] = await Promise.all([users.clearreset_token(req)]);
                // if (isPasswordCorrect){
                    
                // }else{
                //     jsonResponse(res, "incorrect old password");
                // }
            }else{
                jsonResponse(res, "not authorized user");
            }
        } catch (error) {
            console.log(error,"HELLO");
            jsonResponse(res, "error", error);
        };
    },
    signInWithEmail: async (req, res) => {
        try {
            let [results] = await Promise.all([users.signInWithEmail(req)])
                let sqlpassword=results[0].password;
                console.log(sqlpassword);
                if(req.body.password==sqlpassword)
                {
                    const id=results[0].id;
                    const token = jwt.sign({email:results[0].email, id:results[0].id} , "secretkey" , {expiresIn:"30d"})
                    // let [result1]=await Promise.all([notification.find_user(JSON.stringify(results[0].id))])  
                    jsonResponse(res, "User signed In", {token,id})                
                }
                else
                {
                    jsonResponse(res, "Password Incorrect"); 
                }                           
            
        } catch (error) {
            console.log(error)
            jsonResponse(res, "User doesn't exists", error);
        };
    },
    updateUser: async (req, res) => {
        try {

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [results] = await Promise.all([users.updateUser(req)])
            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    
    get_user: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            console.log(req.body.id,"id")
            let [results] = await Promise.all([users.get_user(req)])
            console.log(results,"user details")
            // results[0].site=JSON.parse(results[0].site)
          
            
            
            
            jsonResponse(res, "Got the details of user", results)
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        };
    },
    
}