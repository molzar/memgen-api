const Models = require("../models/index");
const postsEntity = Models.posts;
const db = Models;

function PostsApi() {}

PostsApi.findAllPostsSlide = function(
  idPost,
  idUser,
  includeIdPost,
  whereToLoad,
  limit
) {
  return new Promise((resolve, reject) => {
    const orderBy =
      whereToLoad == -1 ? "order by p.id asc" : "order by p.id desc";
    db.sequelize
      .query(
        `SELECT p.*, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like = 1) as likes, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like <> 1) as dislikes,
           (SELECT COUNT(c.id) FROM comments as c WHERE c.id_post = p.id and c.id_parent is null) as "nbrComments",
           usr.avatarurl, 
           usr.username,
           usr.email
        FROM posts as p 
        Join users usr on usr.id = p.id_user
        where (p.id_user = :idUser or :idUser = '0')
        and ( :idPost = '0' 
            or ((:whereToLoad = '1' and :includeIdPost = '1' and p.id <= :idPost and :idPost != '-1')
                or (:whereToLoad = '-1' and :includeIdPost = '1' and p.id >= :idPost and :idPost != '-1')
                or (:whereToLoad = '1' and :includeIdPost = '0' and p.id < :idPost and :idPost != '-1')
                or (:whereToLoad = '-1' and :includeIdPost = '0' and p.id > :idPost and :idPost != '-1')
                or (:whereToLoad = '0' and p.id <= :idPost and :idPost != '-1')
            or (:idPost = p.id and :idPost = '-1')
            )
        )
        ${orderBy}
        limit :limit`,
        {
          replacements: {
            idPost,
            idUser,
            limit,
            whereToLoad,
            includeIdPost
          },
          type: db.sequelize.QueryTypes.SELECT,
          model: postsEntity,
          mapToModel: true
        }
      )
      .then(posts => {
        resolve({ success: true, data: posts });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.findAllPosts = function(limit, offset) {
  return new Promise((resolve, reject) => {
    db.sequelize
      .query(
        `SELECT p.*, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like = 1) as likes, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like <> 1) as dislikes,
           (SELECT COUNT(c.id) FROM comments as c WHERE c.id_post = p.id and c.id_parent is null) as "nbrComments",
           usr.avatarurl, 
           usr.username,
           usr.email
        FROM posts as p 
        Join users usr on usr.id = p.id_user
        ORDER BY p.id DESC 
        limit :limit 
        offset :offset`,
        {
          replacements: { limit: limit, offset: offset },
          type: db.sequelize.QueryTypes.SELECT,
          model: postsEntity,
          mapToModel: true
        }
      )
      .then(posts => {
        resolve({ success: true, data: posts });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.findOnePost = function(postId) {
  return new Promise(function(resolve, reject) {
    return db.sequelize
      .query(
        `SELECT p.*, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like = 1) as likes, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like <> 1) as dislikes,
           (SELECT COUNT(c.id) FROM comments as c WHERE c.id_post = p.id and c.id_parent is null) as "nbrComments",
           usr.avatarurl, 
           usr.username,
           usr.email
        FROM posts as p 
        Join users usr on usr.id = p.id_user
        where p.id = :id`,
        {
          replacements: { id: postId },
          type: db.sequelize.QueryTypes.SELECT,
          model: postsEntity,
          mapToModel: true
        }
      )
      .then(post => {
        resolve({ success: true, data: post });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.findById = function(id) {
  return new Promise(function(resolve, reject) {
    postsEntity
      .findByPk(id)
      .then(responsePost => {
        resolve({ success: true, data: responsePost });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.findByUser = function(idUser, limit, offset) {
  return new Promise((resolve, reject) => {
    db.sequelize
      .query(
        `SELECT p.*, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like = 1) as likes, 
           (SELECT COUNT(l.like) FROM likes as l WHERE l.id_post = p.id and l.like <> 1) as dislikes,
           (SELECT COUNT(c.id) FROM comments as c WHERE c.id_post = p.id and c.id_parent is null) as "nbrComments",
           usr.avatarurl, 
           usr.username,
           usr.email
        FROM posts as p 
        Join users usr on usr.id = p.id_user
        where p.id_user = :idUser 
        ORDER BY p.id DESC 
        limit :limit 
        offset :offset`,
        {
          replacements: { limit, offset, idUser },
          type: db.sequelize.QueryTypes.SELECT,
          model: postsEntity,
          mapToModel: true
        }
      )
      .then(posts => {
        resolve({ success: true, data: posts });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.update = function(post) {
  return new Promise(function(resolve, reject) {
    postsEntity
      .findByPk(post.id)
      .then(responsePost => {
        if (responsePost && responsePost.id) {
          responsePost.reported += 1;
          responsePost
            .save()
            .then(responseSavePost => {
              resolve({ success: true, data: responseSavePost });
            })
            .catch(e => {
              reject({ success: false, data: e });
            });
        } else {
          reject({ success: false, data: "Post doesn't exist !" });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.deleteById = function(id) {
  return new Promise(function(resolve, reject) {
    postsEntity
      .findByPk(id)
      .then(responsePost => {
        if (responsePost && responsePost.id) {
          responsePost.destroy();
          resolve({ success: true, data: "" });
        } else {
          reject({ success: false, data: "Post doesn't exist !" });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.insert = function(post) {
  return new Promise(function(resolve, reject) {
    postsEntity
      .create({
        url: post.url,
        id_user: post.id_user,
        width: post.width,
        height: post.height,
        title: post.title,
        delete_hash: post.delete_hash
      })
      .then(responsePost => {
        resolve({ success: true, data: responsePost });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

PostsApi.countAllPosts = function() {
  return new Promise(function(resolve, reject) {
    postsEntity
      .count()
      .then(responsePost => {
        resolve({ success: true, data: responsePost });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

module.exports = PostsApi;
