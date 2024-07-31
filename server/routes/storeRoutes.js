const express = require('express');
const storeController = require('../controller/storeController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add', [verifyToken], storeController.addStore);
router.delete('/delete', [verifyToken], storeController.deleteStore);
router.put('/update/:stName', [verifyToken], storeController.updateStore);

module.exports = router;
