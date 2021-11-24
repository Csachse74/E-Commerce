const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER
      , primaryKey: true
      , autoIncrement: true
      , allowNull: false
    }
    , product: {
      type: DataTypes.STRING
      , allowNull: false
    }
    , stock: {
      type: DataTypes.INTEGER
      , defaultValue: 15
      , validate: {
        isNumeric: true
      }
      , allowNull: false
    }
    , price: {
      type: DataTypes.DECIMAL(18, 2)
      , validate: {
        isDecimal: true
      }
      , allowNull: false
    }
    , category_id: {
      type: DataTypes.INTEGER
      , references: {
        model: 'category'
        , key: 'id'
      }
      , allowNull: true
    }
  }
  , {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
