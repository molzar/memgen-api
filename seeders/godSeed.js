'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('users', [{
          
        username: 'god',
        password: 'god',
        email: 'sbogdan@pentalog.com',
        description: 'God',
        avatarurl: null,
        age: 11
      }], {});
        
      const users = await queryInterface.sequelize.query(
        `SELECT id from users where username = 'god';`
      );
      const god = users[0];
        
      return await queryInterface.bulkInsert('posts', [{
        url: 'https://images.unsplash.com/photo-1498015583783-4abcab4a760a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=675&q=80',
        id_user: god.id
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    return await queryInterface.bulkDelete('posts', null, {});
  }
};