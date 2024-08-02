const express = require('express');
const supplierController = require('../controller/supplierController');

const verifyToken = require("../middleware/verifyToken")

const router = express.Router();


router.get('/get', supplierController.getSuppliersController);
router.post('/register', supplierController.registerSupplier);
router.post('/login',supplierController.loginSupplier);
router.put('/update', [verifyToken], supplierController.updateSupplier);
router.delete('/delete/:id', [verifyToken], supplierController.deleteSupplier);
router.delete('/update-password', [verifyToken], supplierController.updateSupplierPassword)

module.exports = router;
