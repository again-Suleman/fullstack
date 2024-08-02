const supplierService = require('../services/supplierService');

// Helper Funtions
const authHelper = require('../helper/authHelper')

// Constants & Composers
const HttpCode = require("../constants/httpCodes")
const AppMessages = require("../constants/appMessages")
const ErrorMessage = require("../composer/error-response")
const SuccessResponse = require("../composer/success-response")



const getSuppliersController = async (req, res) => {
    try {
        const suppliers = await supplierService.getSuppliers()

        if (!suppliers) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.ERROR))
        }
        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.SUCCESS))

    } catch (error) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR))
    }
}


//  REGISTER SUPPLIER
const registerSupplier = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log('Registering supplier:', { firstName, lastName, email });

        // Checking if the user exists
        const exist = await supplierService.getUserByEmail(email);
        if (exist) {
            return res.status(HttpCode.DUPLICATE).send(new ErrorMessage(AppMessages.DUPLICATE));
        }

        // Encrypting password 
        const hashedPassword = await authHelper.hashPassword(password);


        const supplierId = await supplierService.addSupplier(firstName, lastName, email, hashedPassword);

        console.log('New supplier ID:', supplierId);
        if (!supplierId) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }

        return res.status(HttpCode.CREATED).send(new SuccessResponse(AppMessages.USER_SUCCESSFULY_REGISTERED));

    } catch (e) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR))
    }
}



// LOGIN SUPPLIER
const loginSupplier = async (req, res) => {
    try {
        const { email, password } = req.body;
        const supplier = await supplierService.getUserByEmail(email);

        if (!supplier) {
            return res.status(HttpCode.BAD_REQUEST).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }

        const isPasswordValid = await authHelper.comparePassword(password, supplier.password)

        if (!isPasswordValid) {
            return res.status(HttpCode.UNAUTHORIZED).send(new ErrorMessage(AppMessages.INVALID_CREDENTIALS));
        }

        const token = authHelper.generateToken(supplier);

        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.USER_SUCCESSFULY_LOGEDIN, { token }))

    } catch (e) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR))
    }
}


// UPDATE SUPPLIER
const updateSupplier = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const supplierId = req.userId;


        // double Check if the supplier exist 
        const supplier = await supplierService.getSupplierById(supplierId);
        if (!supplier) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }

        const updated = await supplierService.updateSupplier(firstName, lastName, email, supplierId);

        if (!updated) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }

        // Get the updated supplier details
        const updatedSupplier = await supplierService.getSupplierById(supplierId);

        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.UPDATED, updatedSupplier));
    } catch (error) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
};


// DELETE SUPPLIER 
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplierId = req.userId;

        const supplier = await supplierService.getSupplierById(id);
        if (!supplier) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }

        // Ensure the supplier being deleted belongs to the logged-in user
        if (supplier.id !== supplierId) {
            return res.status(HttpCode.UNAUTHORIZED).send(new ErrorMessage(AppMessages.UNAUTHORIZED));
        }

        await supplierService.deleteSupplier(supplier.id)

        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.DELETED));

    } catch (error) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
};


// Update Pasword
const updateSupplierPassword = async (req, res) =>{
    try{
        const supplierId = req.userId;

        const {oldPassword, newPassword, confirmPassword} = req.body
        
        // Confirming they are equal
        if (newPassword !== confirmPassword) {
            return res.status(HttpCode.BAD_REQUEST).send(new ErrorMessage(AppMessages.ERROR));
        }

        // Confirming the old password is matches
        const supplier = await supplierService.getSupplierById(supplierId);
        if (!supplier) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }
        const isPasswordValid = await authHelper.comparePassword(oldPassword, supplier.password);
        if (!isPasswordValid) {
            return res.status(HttpCode.UNAUTHORIZED).send(new ErrorMessage(AppMessages.INVALID_CREDENTIALS).getError());
        }

        // hashing it
        const hashedPassword = await authHelper.hashPassword(newPassword);

        await supplierService.updateSupplierPassword(supplier.id, hashedPassword)

        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.UPDATED_PASSWORD));
        
    } catch (error) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
}



module.exports = {
    getSuppliersController,
    registerSupplier,
    loginSupplier,
    updateSupplier,
    deleteSupplier,
    updateSupplierPassword,
};
