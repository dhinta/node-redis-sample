import mongoose from 'mongoose';
import AppError from '../../lib/error.js';
import CONST from '../../const.js';

const HTTP_CODE = CONST.HTTP_CODE;

mongoose.set('useFindAndModify', false);

const UserModelInstance = mongoose.model('User');
const UserModel = {
  async get(id = null) {
    if (id) {
      try {
        const user = await UserModelInstance.findById(id);
        return user;
      } catch (e) {
        console.log(e);
        // emitted error in error class with msg & send error response
        return 'Error Processing data';
      }
    }
    try {
      const users = await UserModelInstance.find({});
      return users;
    } catch (e) {
      console.log(e);
      // emitted error in error class with msg & send error response
      return 'Error Processing data';
    }
  },
  async create(data = null) {
    const userDoc = new UserModelInstance(data);

    try {
      await userDoc.save();
      return {
        response: 'New Data Inserted',
        statusCode: HTTP_CODE.success
      };
    } catch (err) {
      // emit error in error class with msg & respond with status code
      const arrError = [];
      const objError = err.errors || null;
      if (objError === null) {
        arrError.push(
            new AppError(
                err, 'VALIDATION_ERROR', 'INVALID_INPUT',
                err.code, true
            )
        );
      } else {
        for (const key in objError) {
          if (objError[key]) {
            arrError.push(
                new AppError(
                    null, 'VALIDATION_ERROR', 'INVALID_INPUT',
                    objError[key].message, true
                )
            );
          }
        }
      }

      return {
        response: arrError,
        statusCode: HTTP_CODE.inoperableEntry
      };
    }
  },
  delete(id = null) {

  },
  async update(id = null, body = null) {
    if (body === null) {
      return 'No record to update';
    }

    try {
      const user = await UserModelInstance.findByIdAndUpdate(
          id, body, {new: true, runValidators: true}
      );
      return user;
    } catch (err) {
      const arrError = [];
      const objError = err.errors;
      for (const key in objError) {
        if (objError[key]) {
          arrError.push(objError[key].message);
        }
      }
      return arrError;
    }
  }
};

export default UserModel;
