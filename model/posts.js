const sequelizeHelper = require('../api/utils/helperSequelize.js');
const sequelize = sequelizeHelper.newConnection();
const Sequelize = require('sequelize');
const userEntity = require('./users');

const Posts = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: Sequelize.STRING(500),
    allowNull : true,
    defaultValue : null
    
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: userEntity,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
},{
  timestamps: false
});

module.exports = Posts;