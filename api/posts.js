const Post = require('../model/posts');

function Posts(){}

Posts.findAllPosts = function() {
    return new Promise(function(resolve, reject) {  
        Post.findAll()
            .then(posts => {
                resolve({success: true, data: posts});
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
    })
};

Posts.findById = function(id) {
    return new Promise(function(resolve, reject) {  
        Post.findByPk(id)
            .then(posts => {
                resolve({success: true, data: posts});
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
    })
};

Posts.findByUser = function(idUser) {
    return new Promise(function(resolve, reject) {
        Post.findAll({
            where: {
                id_user : idUser
            }
        })
        .then(posts => {
            resolve({success: true, data: posts});
        })
        .catch(e => {
            reject({success: false, data: e.errors});
        });
    })
};


Posts.update = function(post){
    return new Promise(function(resolve, reject) {
        console.log(post.url);
        console.log(post.id_user);
        Post.findByPk(post.id)
            .then(posts => {
                if (posts && posts.id) {
                    posts.url = post.url;
                    posts.id_user = post.id_user;
                    posts.save()
                        .then((post) => {
                            resolve({success: true, data: post});
                        }).catch(e => {
                            reject({success: false, data: e.errors});
                        });
                }
                else { 
                    reject({success: false, data: "Post doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
        });
};

Posts.deleteById = function(id){
    return new Promise(function(resolve, reject) {  
        Post.findByPk(id)
            .then(posts => {
                if (posts && posts.id) {
                    posts.destroy();
                    resolve({success: true, data: ""});
                }
                else {
                    reject({success: false, data: "Post doesn't exist !"});
                }
            })
            .catch(e => {
                reject({success: false, data: e.errors});
            });
    });
};

Posts.insert = function(post){
    return new Promise(function(resolve, reject) { 
        Post.create({
            url: post.url,
            id_user : post.id_user
        })
        .then(posts => {
            resolve({success: true, data: posts});
        })
        .catch(e => {
            reject({success: false, data: e.errors});
        });
    });
};

module.exports = Posts;