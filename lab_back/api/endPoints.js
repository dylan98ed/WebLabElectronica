const express = require('express');
const router = express.Router();

const {login} = require('../controllers/loginController');

const {inventory, addItem, removeItem} = require('../controllers/inventoryController');

router.post('/login',login);

router.post('/inventory',inventory);

router.post('/add-item',addItem);

router.delete('/remove-item',removeItem);

module.exports = router;