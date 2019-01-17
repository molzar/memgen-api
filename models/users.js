'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull : false,
      validate: {
        notEmpty: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING(4000),
      allowNull : false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull : false,
      validate: {
        isEmail: true,
        notEmpty: true
      },
      unique: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull : true,
      defaultValue : null
    },
    avatarurl: {
      type: DataTypes.STRING(500),
      allowNull : true,
      defaultValue : null
      
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull : true,
      validate:{
        isInt: true
      },
      defaultValue : null
    }
  },{
    timestamps: false
  });
  Users.associate = function(models) {
    Users.hasMany(models.posts, { foreignKey: 'id_user' })
  };
  return Users;
};