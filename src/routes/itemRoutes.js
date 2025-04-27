const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// routes privat
router.post('/',  itemController.createItem);
router.get('/',  itemController.getAllItems);
router.get('/:id', itemController.getItemById);

module.exports = router;