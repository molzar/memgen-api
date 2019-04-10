"use strict";

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "posts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      }
    },
    {
      timestamps: false
    }
  );
  Posts.associate = function(models) {
    Posts.belongsTo(models.users, { foreignKey: "id_user" });
  };
  Posts.associate = function(models) {
    Posts.hasMany(models.likes, { foreignKey: "id_post" });
  };

  Posts.associate = function(models) {
    Posts.hasMany(models.comments, { foreignKey: "id_post" });
  };

  return Posts;
};
