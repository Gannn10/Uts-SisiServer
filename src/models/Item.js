const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./Category');
const Supplier = require('./Supplier');
const Admin = require('./Admin');

const Item = sequelize.define('item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  minimum_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'suppliers',
      key: 'id',
    },
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'admins',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Establish relationships
Item.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Item, { foreignKey: 'categoryId' });

Item.belongsTo(Supplier, { foreignKey: 'supplierId' });
Supplier.hasMany(Item, { foreignKey: 'supplierId' });

Item.belongsTo(Admin, { foreignKey: 'adminId' });
Admin.hasMany(Item, { foreignKey: 'adminId' });

Category.belongsTo(Admin, { foreignKey: 'adminId' });
Admin.hasMany(Category, { foreignKey: 'adminId' });

Supplier.belongsTo(Admin, { foreignKey: 'adminId' });
Admin.hasMany(Supplier, { foreignKey: 'adminId' });

module.exports = Item;