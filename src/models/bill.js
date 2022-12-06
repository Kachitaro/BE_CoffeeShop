'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    idBill: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    invoiceDate: DataTypes.DATE,
    customerID: DataTypes.INTEGER,
    staffID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};