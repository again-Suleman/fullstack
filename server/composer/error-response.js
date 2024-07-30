

let ErrorMessage = class BadRequest{
    constructor(errorMessage) {
      this.status = "0";
      this.errMsg = errorMessage;
      this.result = null;
    }
  
    getError() {
      return {
        status:this.status,
        message: this.message,
        result: this.result,
      };
    }
  };
  
  module.exports = ErrorMessage;
  
