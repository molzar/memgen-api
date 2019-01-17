const Models = require('../models/index');
const usersEntity = Models.users;

function UsersApi(){}

UsersApi.findAllUsers = function() {
    return new Promise(function(resolve, reject) {  
        usersEntity.findAll()
            .then(users => {
                resolve({success: true, data: users});
            })
            .catch(e => {
                reject({success: false, data: e});
            });
    })
};

UsersApi.findById = function(id) {
    return new Promise(function(resolve, reject) {  
        usersEntity.findByPk(id)
            .then(responseUser => {
                resolve({success: true, data: responseUser});
            })
            .catch(e => {
                reject({success: false, data: e});
            });
    })
};

UsersApi.findByUserPass = function(username, password) {
    return new Promise(function(resolve, reject) {
        usersEntity.findAll({
            where: {
                username : username,
                password : password
            }
        })
        .then(users => {
            resolve({success: true, data: users});
        })
        .catch(e => {
            reject({success: false, data: e});
        });
    })
};

UsersApi.update = function(user){
    return new Promise(function(resolve, reject) {
        usersEntity.findByPk(user.id)
            .then(responseUser => {
                if (responseUser && responseUser.username) {
                    responseUser.username = user.username;
                    responseUser.password = user.password;
                    responseUser.email = user.email;
                    responseUser.description = user.description;
                    responseUser.avatarurl = user.avatarurl;
                    responseUser.age = user.age;

                    responseUser.save()
                        .then((reponseSaveUser) => {
                            resolve({success: true, data: reponseSaveUser});
                        }).catch(e => {
                            reject({success: false, data: e});
                        });
                }
                else { 
                    reject({success: false, data: "User doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e});
            });
        });
};

UsersApi.deleteById = function(id){
    return new Promise(function(resolve, reject) {  
        usersEntity.findByPk(id)
            .then(responseUser => {
                if (responseUser && responseUser.username) {
                    responseUser.destroy();
                    resolve({success: true, data: ""});
                }
                else {
                    reject({success: false, data: "User doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e});
            });
    });
};

UsersApi.insert = function(user){
    return new Promise(function(resolve, reject) { 
        usersEntity.create({
            username: user.username, 
            password: user.password, 
            email : user.email,
            description : user.description,
            avatarurl : user.avatarurl,
            age : user.age
        })
        .then(responseUser => {
            resolve({success: true, data: responseUser});
        })
        .catch(e => {
            reject({success: false, data: e});
        });
    });
};

module.exports = UsersApi;