import productService from "../services/productService";

// Constants and Composers
const HttpCode = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorMessage = require("../composer/error-response");
const SuccessResponse = require("../composer/success-response");


const addProduct = async (req, res) => {
    try {
        

    } catch (e) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorMessage(AppMessages.INTERNAL_SERVER_ERROR));
    }
}