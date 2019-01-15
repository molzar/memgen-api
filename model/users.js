const sequelizeHelper = require('../api/utils/helperSequelize.js');
const sequelize = sequelizeHelper.newConnection();
const Sequelize = require('sequelize');

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(256),
    allowNull : false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING(4000),
    allowNull : false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING(256),
    allowNull : false,
    validate: {
      isEmail: true,
      notEmpty: true
    },
    unique: true
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull : true,
    defaultValue : null
  },
  avatarurl: {
    type: Sequelize.STRING(500),
    allowNull : true,
    defaultValue : null
    
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull : true,
    isInt: true,
    defaultValue : null
  }
},{
  timestamps: false
});

module.exports = Users;