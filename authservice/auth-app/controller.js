let data = require('./data');

exports.authUser = function(param, callback) {
    data.authUser(param, (error, result) => {
//        console.log(result);
	if (!error) {
            if (!result || result.length == 0) {
                callback({error: 'user not found'});
            } else if (result[0].user_status == '1') {
                callback(null, result[0]);
            } else {
                callback({ error: 'user not active' });
            }
        } else {
            callback(error);
        }
    });
}

exports.findTransaction = function(param, callback) {
    data.findTransaction(param, (error, result) => {
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
