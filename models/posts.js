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
          key: "id",
          as: "id_user"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      reported: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      delete_hash: {
        type: DataTypes.STRING(2000),
        allowNull: true,
        defaultValue: null
      },
      title: {
        type: DataTypes.STRING(2000),
        allowNull: true,
        defaultValue: null
      },
      width: {
        type: DataTypes.STRING(5),
        allowNull: true,
        defaultValue: null
      },
      height: {
        type: DataTypes.STRING(5),
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
    Posts.hasMany(models.likes, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      hooks: true,
      as: "id_post",
      foreignKey: "id_post",
      constraints: true
    });
  };

  Posts.associate = function(models) {
    Posts.hasMany(models.comments, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      hooks: true,
      as: "id_post",
      foreignKey: "id_post",
      constraints: true
    });
  };

  return Posts;
};
