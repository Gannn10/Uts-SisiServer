
const Supplier = require('../models/Supplier');

// supplier bru
exports.createSupplier = async (req, res) => {
  try {
    const { name, contact_name, email, phone, address } = req.body;
    
  
    const supplier = await Supplier.create({
      name,
      contact_name,
      email,
      phone,
      address,
      adminId: req.admin.id,
    });
    
    return res.status(201).json({
      message: 'Supplier berhasil ditambahkan',
      supplier,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// semua suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    return res.status(200).json({ suppliers });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier tidak ditemukan' });
    }
    
    return res.status(200).json({ supplier });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};