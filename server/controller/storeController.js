const storeService = require('../services/storeService');

// Constants and Composers
const HttpCode = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorMessage = require("../composer/error-response");
const SuccessResponse = require("../composer/success-response");


const getStores = async (req, res) => {
    try {
        const spId = req.userId;
        const stores = await storeService.getStoresByOwner(spId);

        if (!stores || stores.length === 0) {
            return res.status(HttpCode.NOT_FOUND).send(new ErrorMessage(AppMessages.STORE_NOT_FOUND))
        }

        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.OK, stores))

    } catch (error) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
}


const addStore = async (req, res) => {
    try {
        console.log("Request body:", req.body); 
        console.log("Uploaded file:", req.file); 
        const { stName, description } = req.body;
        const spId = req.userId;
        const file = req.file;

        if (!file) {
            return res.status(400).send(new ErrorMessage('No file uploaded.'));
        }

        const logoPath = file.path; 

        const storeId = await storeService.addStore(spId, stName, description, logoPath);
        return res.status(HttpCode.CREATED).send(new SuccessResponse(AppMessages.STORE_CREATED, { storeId }));

    } catch (error) {
        console.error("Error in addStore:", error);
        if (error.code === AppMessages.DUPLICATE_ERROR) {
            return res.status(HttpCode.BAD_REQUEST).send(new ErrorMessage(AppMessages.DUPLICATE_STORE));
        }
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

        await storeService.getStoreByNameAndSupplier(spId, newStName);
        return res.status(HttpCode.OK).send(new SuccessResponse(AppMessages.STORE_UPDATED));

    } catch (e) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
}


module.exports = {
    addStore,
    deleteStore,
    updateStore,
    getStores
};
