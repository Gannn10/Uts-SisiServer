const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');


// routes privat
router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getSupplierById);

module.exports = router;