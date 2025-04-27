const Category = require('../models/Category');

// new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Check category 
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Kategori sudah ada' });
    }
    
    // Create new category
    const category = await Category.create({
      name,
      description,
      adminId: req.admin.id,
    });
    
    return res.status(201).json({
      message: 'Kategori berhasil dibuat',
      category,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }
    
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};