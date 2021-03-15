const express = require('express');
const router = express.Router();
const recursos = require('./controllers/API/sellOrderController.js');


router.get('/sellOrders', recursos.sellOrders);

router.get('/sellOrders/:id', recursos.show);

router.post('/sellOrders', recursos.newSellOrder);


module.exports = router;