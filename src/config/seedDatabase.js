require('dotenv').config();
const { sequelize } = require('./database');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const Item = require('../models/Item');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    
    // admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'super_admin',
    });

    // categories
    const categories = await Category.bulkCreate([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        adminId: admin.id,
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        adminId: admin.id,
      },
      {
        name: 'Groceries',
        description: 'Food and household items',
        adminId: admin.id,
      },
    ]);

    // suppliers
    const suppliers = await Supplier.bulkCreate([
      {
        name: 'Tech Suppliers Inc.',
        contact_name: 'John Doe',
        email: 'john@techsuppliers.com',
        phone: '555-1234',
        address: '123 Tech Street, Silicon Valley',
        adminId: admin.id,
      },
      {
        name: 'Fashion Wholesale Ltd.',
        contact_name: 'Jane Smith',
        email: 'jane@fashionwholesale.com',
        phone: '555-5678',
        address: '456 Fashion Avenue, New York',
        adminId: admin.id,
      },
      {
        name: 'Food Distributors Co.',
        contact_name: 'Bob Johnson',
        email: 'bob@fooddistributors.com',
        phone: '555-9876',
        address: '789 Food Street, Chicago',
        adminId: admin.id,
      },
    ]);

    // items
    await Item.bulkCreate([
      {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 1200.00,
        stock: 10,
        sku: 'ELEC-001',
        minimum_stock: 5,
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        adminId: admin.id,
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone model',
        price: 800.00,
        stock: 15,
        sku: 'ELEC-002',
        minimum_stock: 5,
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        adminId: admin.id,
      },
      {
        name: 'T-shirt',
        description: 'Cotton t-shirt',
        price: 25.00,
        stock: 50,
        sku: 'CLOTH-001',
        minimum_stock: 10,
        categoryId: categories[1].id,
        supplierId: suppliers[1].id,
        adminId: admin.id,
      },
      {
        name: 'Jeans',
        description: 'Denim jeans',
        price: 45.00,
        stock: 30,
        sku: 'CLOTH-002',
        minimum_stock: 8,
        categoryId: categories[1].id,
        supplierId: suppliers[1].id,
        adminId: admin.id,
      },
      {
        name: 'Rice',
        description: '5kg pack of rice',
        price: 12.00,
        stock: 100,
        sku: 'GROC-001',
        minimum_stock: 20,
        categoryId: categories[2].id,
        supplierId: suppliers[2].id,
        adminId: admin.id,
      },
      {
        name: 'Milk',
        description: '1L carton of milk',
        price: 3.00,
        stock: 4,
        sku: 'GROC-002',
        minimum_stock: 15,
        categoryId: categories[2].id,
        supplierId: suppliers[2].id,
        adminId: admin.id,
      },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();