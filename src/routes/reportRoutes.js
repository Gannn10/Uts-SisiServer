const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');


// routes privat
router.get('/stock-summary', reportController.getStockSummary);
router.get('/low-stock',  reportController.getLowStockItems);
module.exports = router;