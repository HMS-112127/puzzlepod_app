const mysqli = require('./users_mysqli');
const mysqliClass = new mysqli();

class Users {
    constructor() {}

    async getUsersDetails() {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, 'all_users');
        return await global.mysql.query(strQuery, escape_data);
    }
    async getUser(id) {
        let mysql = {};
        let escape_data = [id];
        let strQuery = await mysqliClass.mysqli(mysql, 'single_user');
        return await global.mysql.query(strQuery, escape_data);
    }
    

    async signup(req) {
        let mysql = {};
        let escape_data = [req.body.name,req.body.username,req.body.email, req.body.password];
        let strQuery = await mysqliClass.mysqli(mysql, 'signup');
        return await global.mysql.query(strQuery, escape_data);
    }
    
    async updateFlag(req) {
        let mysql = {};
        let escape_data = [req.params.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'updateFlag');
        return await global.mysql.query(strQuery, escape_data);
    }
    async save_token(token_mail_verification, req) {
        let mysql = {};
        let escape_data = [token_mail_verification,req.params.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'save_token');
        return await global.mysql.query(strQuery, escape_data);
    }

    async updatepass(password,req) {
        let mysql = {};
        let escape_data = [password,req.params.email];
        let strQuery = await mysqliClass.mysqli(mysql, 'updatepass');
        return await global.mysql.query(strQuery, escape_data);
    }
    async clearreset_token(req) {
        let mysql = {};
        let escape_data = [req.params.email];
        let strQuery = await mysqliClass.mysqli(mysql, 'clearreset_token');
        return await global.mysql.query(strQuery, escape_data);
    }
    async signInWithOtp(req) {
        let mysql = {};
        let escape_data = [req.body.phone_no];
        let strQuery = await mysqliClass.mysqli(mysql, 'signInWithOtp');
        return await global.mysql.query(strQuery, escape_data);
    }

    async check_num(req) {
        let mysql = {};
        let escape_data = [req.params.num];
        let strQuery = await mysqliClass.mysqli(mysql, 'check_num');
        return await global.mysql.query(strQuery, escape_data);
    }
    async signInWithgoogle(req) {
        let mysql = {};
        let escape_data = [req.body.email];
        let strQuery = await mysqliClass.mysqli(mysql, 'signInWithgoogle');
        return await global.mysql.query(strQuery, escape_data);
    }

    async signupgoogle(req) {
        let mysql = {};
        let escape_data = [req.body.email, req.body.isUser,"True"];
        let strQuery = await mysqliClass.mysqli(mysql, 'signupgoogle');
        return await global.mysql.query(strQuery, escape_data);
    }

    async signInWithEmail(req) {
        let mysql = {};
        let escape_data = [req.body.email,req.body.password];
        let strQuery = await mysqliClass.mysqli(mysql, 'signInWithEmail');
        return await global.mysql.query(strQuery, escape_data);
    }
    async getuserbyemail(req) {
        let mysql = {};
        let escape_data = [req.params.email];
        let strQuery = await mysqliClass.mysqli(mysql, 'signInWithEmail');
        return await global.mysql.query(strQuery, escape_data);
    }



    async get_user(req) {
        let mysql = {};
        // console.log(req.body.id)
        let escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_user');

        return await global.mysql.query(strQuery, escape_data);
    }
    async get_vendor(req) {
        let mysql = {};
        // console.log(req.body.Uid)
        let escape_data = [req.body.Uid];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_user');

        return await global.mysql.query(strQuery, escape_data);
    }

    async updateUser(req) {
        let mysql = {};
        let escape_data;
        // let strQuery;
        // for(const [key,value] of Object.entries(req.body)){
        //     escape_data = [key,value,req.body.id];
            
        //     strQuery = await mysqliClass.mysqli(mysql, 'updateUser');
        //     return await global.mysql.query(strQuery, escape_data);
        // }
        var obj=new Date();
        req.body.updated_at=obj.getTime()
   
        escape_data = [req.body.first_name,
            req.body.email,
            req.body.pin,
            req.body.phone_no,
            req.body.whatsapp_no,
            req.body.state,
            req.body.city,
            req.body.company_detail_name,
            req.body.company_name,
            req.body.company_title,
            req.body.company_whatsapp_no,
            req.body.company_phone_no,
            req.body.company_email_address,
            req.body.company_building_name,
            req.body.company_house_no,
            req.body.company_street,
            req.body.company_landmark,
            req.body.company_city,
            req.body.company_state,
            req.body.company_pincode,
            req.body.fax,
            req.body.id];
            
       
            console.log(req.body,escape_data)
        let strQuery = await mysqliClass.mysqli(mysql, 'updateUser');
        return await global.mysql.query(strQuery, escape_data);
    }
    async add_site(req,arr) {
        let mysql = {};
        let escape_data;

        escape_data = [JSON.stringify(arr),req.body.id];
        // escape_data=[req.body.id]
        // console.log(escape_data,"escape data")
        let strQuery = await mysqliClass.mysqli(mysql, 'add_site');
        return await global.mysql.query(strQuery, escape_data);
    }
    async update_site(req) {
        let mysql = {};
        let escape_data;
        
        escape_data = [JSON.stringify(req.body),req.body.id];
        // escape_data=[req.body.id]
        // console.log(escape_data,"escape data")
        let strQuery = await mysqliClass.mysqli(mysql, 'add_site');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_site(req) {
        let mysql = {};
        let escape_data;

        // escape_data=[req.body.id]
        escape_data =[req.body.id]
        let strQuery = await mysqliClass.mysqli(mysql, 'get_site');
        return await global.mysql.query(strQuery, escape_data);
    }
    async add_feedback(req) {
        let mysql = {};
        let escape_data;
        
        const feedback = req.body        
        const value = feedback.feed + "," + feedback.rate
        escape_data = [value,req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'add_feedback');
        return await global.mysql.query(strQuery, escape_data);
    }
    async request_help(req) {
        let mysql = {};
        let dest = undefined;
        let file_type = undefined;
        if(req.file) {
            dest = `/public/assets/help_files/${req.file.filename}`;
            const type = req.file.originalname.split(".")
            file_type = type[type.length-1]
        }
        let escape_data = [req.body.id, req.body.message, dest , file_type];
        // console.log("escape", escape_data)
        let strQuery = await mysqliClass.mysqli(mysql, 'request_help');
        return await global.mysql.query(strQuery, escape_data);
    }  

    async deal_closed(req) {
        
        let mysql = {};
        let escape_data;
        escape_data = ["deal closed",req.body.pitch_value,req.body.pitch_value,req.body.Pid,"pitched"];

        let strQuery = await mysqliClass.mysqli(mysql, 'deal_closed');
        return await global.mysql.query(strQuery, escape_data);
    }

    async user_accepted_pitch(req,vendor) {
        
        let mysql = {};
        let escape_data;
        escape_data = ["acceptedPitch",vendor,req.body.Pid,req.body.Uid];

        let strQuery = await mysqliClass.mysqli(mysql, 'user_accepted_pitch');
        return await global.mysql.query(strQuery, escape_data);
    }

    async product_table_status_changed(req) {
        let mysql = {};
        let escape_data;
        escape_data = ["accepted",req.body.Uid,req.body.pitch_value,req.body.Pid];
        // console.log(escape_data,"escape data")
        let strQuery = await mysqliClass.mysqli(mysql, 'product_table_status_changed');
        return await global.mysql.query(strQuery, escape_data);
    }
    async user_rejected_pitch(req) {
        let mysql = {};
        let escape_data;

        escape_data = ["rejectedPitch",req.body.Pid,req.body.Uid];
        // console.log(escape_data,"escape data")
        let strQuery = await mysqliClass.mysqli(mysql, 'user_rejected_pitch');
        return await global.mysql.query(strQuery, escape_data);
    }
     async Table_filter(req){
        let mysql = {};
        let escape_data;
        escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'table_filter');
        return await global.mysql.query(strQuery, escape_data);
    }
    async Type_filter(req){
        let mysql = {};
        let escape_data;
        escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'type_filter');
        return await global.mysql.query(strQuery, escape_data);
    }
    async recent_products(req) {
        let mysql = {};
        let escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'recent_products');
        return await global.mysql.query(strQuery, escape_data);
    }


    

    

    
    

    

    
}

module.exports = Users;

// const object = {'a': 1, 'b': 2, 'c' : 3};

// for (const [key, value] of Object.entries(object)) {
//   console.log(key, value);
// }