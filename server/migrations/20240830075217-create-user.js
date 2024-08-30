"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensures the email format is valid
        },
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true, // Ensures only numeric characters are allowed
          len: [10, 15], // Adjust length as per your requirement
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["Male", "Female"]], // Validates gender against a list of values
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true, // Optional field, can be null
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true, // Optional field, can be null
      },
      otpValidity: {
        type: Sequelize.DATE,
        allowNull: true, // Optional field, can be null
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true, // Optional field, can be null
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Defaults to false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
