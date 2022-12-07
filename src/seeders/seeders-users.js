'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'admin@gmail.com',
      password:'12345678',
      gender: 1,
      phoneNumber: '0123456789',
      birthDate: new Date(),
      address: 'Ho Chi Minh',
      salary: 1000000,
      position: 'Manager',
      roleId: 'R1',
      image:'112312312312312312312312',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
