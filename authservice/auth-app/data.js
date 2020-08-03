let database = require('mysql');
var connection = database.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'auth'
});
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});

exports.authUser = function(param, callback) {
	result = connection.query('select user_id, user_status from user where username = \'' + param.username + '\' and password = \'' + param.password + '\'', (error, result) => {
    // console.log(result['user_id'])
        if (!error) {
            callback(null, result);
        } else {
            callback(error);
        }
    });
}

exports.findTransaction = function(param, callback) {
    var query = 'select order_id, user_id, itemname, quantity, order_status, expected_dod from order_transaction ';
    if (param && param.user_id) {
        query += 'where user_id = \'' + param.user_id + '\'';
    }
   connection.query(query, (error, result) => {
        if (!error) {
            callback(null, result);
        } else {
            callback(error);
        }
    });
}

exports.addUser = function (param, callback) {
    console.log('user added');
    callback();
}

exports.updateUser = function (param, callback) {
    console.log('user modified');
    callback();
}

exports.deleteUser = function(param, callback) {
    console.log('user deleted');
    callback();
}
