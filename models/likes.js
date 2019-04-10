"use strict";

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "likes",
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
      like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        isInt: true,
        defaultValue: null
      }
    },
    {
      timestamps: false
    }
  );
  Likes.associate = function(models) {
    Likes.belongsTo(models.posts, { foreignKey: "id_post" });
  };
  Likes.associate = function(models) {
    Likes.belongsTo(models.users, { foreignKey: "id_user" });
  };
  return Likes;
};
