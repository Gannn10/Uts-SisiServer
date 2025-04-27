const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Register  admin
exports.register = async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;
    
    // Check admin already
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    // Create new admin
    const admin = await Admin.create({
      username,
      password,
      name,
      email,
      role: role || 'admin',
    });
    
    return res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login admin
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get admin profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ['password'] },
    });
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    return res.status(200).json({ admin });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};