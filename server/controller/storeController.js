const storeService = require('../services/storeService');

// Constants and Composers
const HttpCode = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorMessage = require("../composer/error-response");
const SuccessResponse = require("../composer/success-response");



const addStore = async (req, res) => {
    try {
        const { stName, description } = req.body;
        const spId = req.userId; // Getting the idddd

        const storeId = await storeService.addStore(spId, stName, description);
        return res.status(HttpCode.CREATED).send(new SuccessResponse(AppMessages.STORE_CREATED, { storeId }));

    } catch (error) {
        if (error.code === AppMessages.DUPLICATE_ERROR)
            return res.status(HttpCode.BAD_REQUEST).send(new ErrorMessage(AppMessages.DUPLICATE_STORE));
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
};


const deleteStore = async (req, res) => {
    try {
        const { stName } = req.body;
        const spId = req.userId;

        // Check if the store existed for that user
        const exist = await storeService.getStoreByNameAndSupplier(spId, stName);
        if (!exist) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.STORE_NOT_FOUND));
        }

        // Now delete it
        const deleted = await storeService.deleteStore(spId, stName);
        if (!deleted) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.STORE_DELETED));
        }

        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.STORE_DELETED))

    } catch (e) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
}


const updateStore = async (req, res) => {
    try {
        const { stName } = req.params;
        const { newStName, description } = req.body;
        const spId = req.userId;

        // Checking if the previous store exist agaisnt that userrr
        const store = await storeService.getStoreByNameAndSupplier(spId, stName);
        if (!store) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.STORE_NOT_FOUND));
        }


        console.log(stName, newStName, description)
        const updated = await storeService.updateStore(spId, stName, newStName, description);
        if (!updated) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.RESOURCE_NOT_FOUND));
        }

        const updatedStore = await storeService.getStoreByNameAndSupplier(spId, newStName);
        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.STORE_UPDATED));

    } catch (e) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
}


module.exports = {
    addStore,
    deleteStore,
    updateStore
};
