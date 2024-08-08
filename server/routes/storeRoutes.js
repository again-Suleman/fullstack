const express = require('express');
const storeController = require('../controller/storeController');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/add', [verifyToken, upload.single('logo')], storeController.addStore);
router.delete('/delete', [verifyToken], storeController.deleteStore);
router.put('/update/:stName', [verifyToken], storeController.updateStore);
router.get('/', [verifyToken], storeController.getStores)

module.exports = router;
