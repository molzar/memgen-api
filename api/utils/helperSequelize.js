const Sequelize = require('sequelize');
const getConfig = require('../../configs.js');

function SequelizeConnection(){}

const config = getConfig.DB();

SequelizeConnection.newConnection = function() { 
    return new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      dialect: 'postgres',
      operatorsAliases: false,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });
}

SequelizeConnection.testConnection = function() {
  SequelizeConnection.newConnection
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = SequelizeConnection;