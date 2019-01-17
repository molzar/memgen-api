const Models = require('../models/index');
const postsEntity = Models.posts;

function PostsApi(){}

PostsApi.findAllPosts = function() {
    return new Promise(function(resolve, reject) {  
        postsEntity.findAll()
            .then(posts => {
                resolve({success: true, data: posts});
            })
            .catch(e => {
                reject({success: false, data: e});
            });
    })
};

PostsApi.findById = function(id) {
    return new Promise(function(resolve, reject) {  
        postsEntity.findByPk(id)
            .then(responsePost => {
                resolve({success: true, data: responsePost});
            })
            .catch(e => {
                reject({success: false, data: e});
            });
    })
};

PostsApi.findByUser = function(idUser) {
    return new Promise(function(resolve, reject) {
        postsEntity.findAll({
            where: {
                id_user : idUser
            }
        })
        .then(posts => {
            resolve({success: true, data: posts});
        })
        .catch(e => {
            reject({success: false, data: e});
        });
    })
};


PostsApi.update = function(post){
    return new Promise(function(resolve, reject) {
        postsEntity.findByPk(post.id)
            .then(responsePost => {
                if (responsePost && responsePost.id) {
                    responsePost.url = post.url;
                    responsePost.id_user = post.id_user;
                    responsePost.save()
                        .then((responseSavePost) => {
                            resolve({success: true, data: responseSavePost});
                        }).catch(e => {
                            reject({success: false, data: e});
                        });
                }
                else { 
                    reject({success: false, data: "Post doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e});
            });
        });
};

PostsApi.deleteById = function(id){
    return new Promise(function(resolve, reject) {  
        postsEntity.findByPk(id)
            .then(responsePost => {
                if (responsePost && responsePost.id) {
                    responsePost.destroy();
                    resolve({success: true, data: ""});
                }
                else {
                    reject({success: false, data: "Post doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e});
            });
    });
};

PostsApi.insert = function(post){
    return new Promise(function(resolve, reject) { 
        postsEntity.create({
            url: post.url,
            id_user : post.id_user
        })
        .then(responsePost => {
            resolve({success: true, data: responsePost});
        })
        .catch(e => {
            reject({success: false, data: e});
        });
    });
};

module.exports = PostsApi;