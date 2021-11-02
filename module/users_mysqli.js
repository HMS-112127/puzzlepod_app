module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['all_users'] = 'SELECT * FROM users';
mysqliq['single_user'] = 'SELECT * FROM users WHERE id = ?'



mysqliq['insert_user'] = 'INSERT into users (email,password) values(?,?)';
mysqliq['signup'] = 'INSERT into users (name,username,email,password) values(?,?,?,?)';
mysqliq['signInWithOtp'] = 'SELECT * from users WHERE phone_no=? ';
mysqliq['check_num'] = 'SELECT * FROM users WHERE phone_no = ?'
mysqliq['updateFlag'] = 'UPDATE users SET isverified="True" WHERE id=?';
mysqliq['save_token'] = 'UPDATE users SET reset_token=? WHERE id=?';
mysqliq['updatepass'] = 'UPDATE users SET password=? WHERE email=?';
mysqliq['clearreset_token'] = 'UPDATE users SET reset_token ="" WHERE email=?';
mysqliq['signInWithEmail'] = 'SELECT * from users WHERE email=? ';
mysqliq['get_user']= 'SELECT * from users WHERE id=?';
mysqliq['updateUser'] = 'UPDATE users SET first_name=?,email=?,pin=?,phone_no=?,whatsapp_no=?,state=?,city=?,company_detail_name=?,company_name=?,company_title=?,company_whatsapp_no=?,company_phone_no=?,company_email_address=?,company_building_name=?,company_house_no=?,company_street=?,company_landmark=?,company_city=?,company_state=?,company_pincode=?,fax=? WHERE id=? ';