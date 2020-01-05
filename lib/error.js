import CONST from '../const.js';

const ERROR_CODE = CONST.ERROR_CODE;
/* eslint-disable require-jsdoc */
class AppError extends Error {
  constructor(error, name, errorCode, description, isOperational = false) {
    super();
    this.name = name;
    this.date = new Date();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this);
    }

    if (isOperational) {
      this.buildOperationalError(name, errorCode, description);
    } else {
      this.buildProgramError();
    }
  }

  buildOperationalError(name, errorCode, description) {
    this.errorCode = errorCode;
    this.errorMessage = ERROR_CODE[
        name + '.' +
        errorCode + '.' +
        description
    ] || description;
  }

  buildProgramError() {

  }
}

export default AppError;
