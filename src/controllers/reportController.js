const { sequelize } = require('../config/database');
const Item = require('../models/Item');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const { QueryTypes } = require('sequelize');

// Get stock summary
exports.getStockSummary = async (req, res) => {
  try {
    const summary = await sequelize.query(`
      SELECT 
        COUNT(*) AS total_items, 
        SUM(stock) AS total_stock, 
        SUM(price * stock) AS total_stock_value, 
        AVG(price) AS average_price
      FROM items
    `, { type: QueryTypes.SELECT });
    
    return res.status(200).json({ summary: summary[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// low stock items
exports.getLowStockItems = async (req, res) => {
  try {
    const threshold = req.query.threshold || 5;
    
    const lowStockItems = await Item.findAll({
      where: {
        stock: { [sequelize.Op.lt]: threshold },
      },
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Supplier, attributes: ['id', 'name'] },
      ],
    });
    
    return res.status(200).json({ 
      threshold,
      count: lowStockItems.length,
      items: lowStockItems
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};