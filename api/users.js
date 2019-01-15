const User = require('../model/users');

function Users(){}

Users.findAllUsers = function() {
    return new Promise(function(resolve, reject) {  
        User.findAll()
            .then(users => {
                resolve({success: true, data: users});
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
    })
};

Users.findById = function(id) {
    return new Promise(function(resolve, reject) {  
        User.findByPk(id)
            .then(users => {
                resolve({success: true, data: users});
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
    })
};

Users.findByUserPass = function(username, password) {
    return new Promise(function(resolve, reject) {
        User.findAll({
            where: {
                username : username,
                password : password
            }
        })
        .then(users => {
            resolve({success: true, data: users});
        })
        .catch(e => {
            reject({success: false, data: e.errors});
        });
    })
};

Users.update = function(user){
    return new Promise(function(resolve, reject) {
        User.findByPk(user.id)
            .then(users => {
                if (users && users.username) {
                    users.username = user.username;
                    users.password = user.password;
                    users.email = user.email;
                    users.description = user.description;
                    users.avatarurl = user.avatarurl;
                    users.age = user.age;

                    users.save()
                        .then((user) => {
                            resolve({success: true, data: user});
                        }).catch(e => {
                            reject({success: false, data: e.errors});
                        });
                }
                else { 
                    reject({success: false, data: "User doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
        });
};

Users.deleteById = function(id){
    return new Promise(function(resolve, reject) {  
        User.findByPk(id)
            .then(users => {
                if (users && users.username) {
                    users.destroy();
                    resolve({success: true, data: ""});
                }
                else {
                    reject({success: false, data: "User doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
    });
};

Users.insert = function(user){
    return new Promise(function(resolve, reject) { 
        User.create({
            username: user.username, 
            password: user.password, 
            email : user.email,
            description : user.description,
            avatarurl : user.avatarurl,
            age : user.age
        })
        .then(users => {
            resolve({success: true, data: users});
        })
        .catch(e => {
            reject({success: false, data: e.errors});
        });
    });
};

module.exports = Users;