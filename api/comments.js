const Models = require("../models/index");
const commentsEntity = Models.comments;
const db = Models;

function CommentsApi() {}

CommentsApi.findById = function(id) {
  return new Promise(function(resolve, reject) {
    commentsEntity
      .findByPk(id)
      .then(responsePost => {
        resolve({ success: true, data: responsePost });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

CommentsApi.findByPost = function(idPost, limit, offset, idParent) {
  return new Promise(function(resolve, reject) {
    return db.sequelize
      .query(
        `SELECT c.id as id_comment, 
                c.id_post as id_post,
                c.id_user as id_user,
                c.text_comment as text_comment,
                c.created_at as created_at,
                c.updated_at as updated_at,
                u.avatarurl as avatarurl,
                u.username as username,
                c.id_parent as id_parent,
                (SELECT COUNT(rep.id) FROM comments rep WHERE rep.id_parent = c.id ) count_replay,
                (select count(cc.id) FROM comments as cc where cc.id_post = :idPost and ((cc.id_parent = :idParent) or (:idParent = -1 and cc.id_parent is null ))) as "nbrComments"
        FROM comments as c
          join users u on u.id = c.id_user
        where c.id_post = :idPost
          and ((c.id_parent = :idParent) or (:idParent = -1 and c.id_parent is null ))
        ORDER BY c.updated_at desc
        limit :limit
        offset :offset`,
        {
          replacements: {
            idPost,
            limit,
            offset,
            idParent: idParent ? idParent : -1
          },
          type: db.sequelize.QueryTypes.SELECT,
          model: commentsEntity,
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

CommentsApi.update = function(comment, limit, offset) {
  console.log(comment.id_parent);
  return new Promise(function(resolve, reject) {
    commentsEntity
      .findByPk(comment.id)
      .then(responseComment => {
        if (responseComment && responseComment.id) {
          responseComment.text_comment = comment.text_comment;
          responseComment.edited_at = new Date();
          responseComment
            .save()
            .then(() => {
              resolve(
                CommentsApi.findByPost(
                  comment.id_post,
                  limit,
                  offset,
                  comment.id_parent
                )
              );
            })
            .catch(e => {
              reject({ success: false, data: e });
            });
        } else {
          reject({ success: false, data: "Comment doesn't exist !" });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

CommentsApi.deleteById = function(commentId) {
  return new Promise(function(resolve, reject) {
    commentsEntity
      .findByPk(commentId)
      .then(responseComment => {
        if (responseComment && responseComment.id) {
          console.table(responseComment);
          responseComment.destroy();
          resolve({
            success: true,
            data: { commentId, idParent: responseComment.id_parent }
          });
        } else {
          reject({ success: false, data: "Comment doesn't exist !" });
        }
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

CommentsApi.insert = function(comment, limit, offset) {
  return new Promise(function(resolve, reject) {
    commentsEntity
      .create({
        id_post: comment.id_post,
        id_user: comment.id_user,
        text_comment: comment.text_comment,
        id_parent: comment.id_parent ? comment.id_parent : null
      })
      .then(() => {
        resolve(
          CommentsApi.findByPost(
            comment.id_post,
            limit,
            offset,
            comment.id_parent ? comment.id_parent : -1
          )
        );
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

CommentsApi.countPostComments = function(idPost, idParent) {
  return new Promise(function(resolve, reject) {
    commentsEntity
      .count({
        where: {
          id_post: idPost,
          id_parent: idParent
        }
      })
      .then(responsePost => {
        resolve({ success: true, data: responsePost });
      })
      .catch(e => {
        reject({ success: false, data: e });
      });
  });
};

module.exports = CommentsApi;
