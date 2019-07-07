const Models = require("../models/index");
const likesEntity = Models.likes;
const postsApi = require("../api/posts");

function LikesApi() {}

LikesApi.findByPost = function(idPost) {
  return new Promise(function(resolve, reject) {
    likesEntity
      .findAll({
        where: {
          id_post: idPost
        }
      })
      .then(likes => {
        resolve({ success: true, data: likes });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

LikesApi.upsert = function(like) {
  return new Promise(function(resolve, reject) {
    likesEntity
      .findOne({ where: { id_post: like.id_post, id_user: like.id_user } })
      .then(function(obj) {
        if (obj) {
          obj.like = like.like;
          obj
            .save()
            .then(() => {
              resolve(postsApi.findOnePost(like.id_post));
            })
            .catch(e => {
              reject({ success: false, data: e });
            });
        } else {
          LikesApi.insert(like)
            .then(response => {
              if (response.success) {
                resolve(postsApi.findOnePost(like.id_post));
              } else reject({ success: false, data: response.data });
            })
            .catch(e => {
              reject({ success: false, data: e });
            });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

LikesApi.update = function(like) {
  return new Promise(function(resolve, reject) {
    likesEntity
      .findByPk(like.id)
      .then(responseLike => {
        if (responseLike && responseLike.id) {
          responseLike.id_post = like.id_post;
          responseLike.id_user = like.id_user;
          responseLike.like = like.like;
          responseLike
            .save()
            .then(responseSaveLike => {
              resolve({ success: true, data: responseSaveLike });
            })
            .catch(e => {
              reject({ success: false, data: e });
            });
        } else {
          reject({ success: false, data: "Like doesn't exist !" });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

LikesApi.deleteById = function(id) {
  return new Promise(function(resolve, reject) {
    likesEntity
      .findByPk(id)
      .then(responseLike => {
        if (responseLike && responseLike.id) {
          responseLike.destroy();
          resolve({ success: true, data: "" });
        } else {
          reject({ success: false, data: "Like doesn't exist !" });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

LikesApi.insert = function(like) {
  return new Promise(function(resolve, reject) {
    likesEntity
      .create({
        id_post: like.id_post,
        id_user: like.id_user,
        like: like.like
      })
      .then(responseLike => {
        resolve({ success: true, data: responseLike });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

module.exports = LikesApi;
