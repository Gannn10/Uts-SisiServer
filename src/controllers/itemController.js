const Item = require('../models/Item');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');

//  new item
exports.createItem = async (req, res) => {
  try {
    const { name, description, price, stock, sku, minimum_stock, categoryId, supplierId } = req.body;
    
    // Check 
    const existingItem = await Item.findOne({ where: { sku } });
    if (existingItem) {
      return res.status(400).json({ message: 'Item dengan SKU ini sudah ada' });
    }
    
    // buat item
    const item = await Item.create({
      name,
      description: description || "Default Description",
      price,
      stock,
      sku,
      minimum_stock: minimum_stock || 5,
      categoryId,
      supplierId,
      adminId: 1, // <- sementara kasih 1 manual
    });
    
    
    return res.status(201).json({
      message: 'Item berhasil ditambahkan',
      item,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// semua items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Supplier, attributes: ['id', 'name'] },
      ],
    });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Supplier, attributes: ['id', 'name'] },
      ],
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan' });
    }
    
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};