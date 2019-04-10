"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_post: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id"
        }
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      text_comment: {
        type: DataTypes.STRING(4000),
        allowNull: true,
        defaultValue: null
      },
      id_parent: {
        type: DataTypes.INTEGER,
        references: {
          model: "comments",
          key: "id"
        }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: false
    }
  );
  Comments.associate = function(models) {
    Comments.belongsTo(models.posts, { foreignKey: "id_post" });
  };
  Comments.associate = function(models) {
    Comments.belongsTo(models.users, { foreignKey: "id_user" });
  };
  Comments.associate = function(models) {
    Comments.hasMany(models.comments, { foreignKey: "id_parent" });
  };
  return Comments;
};
