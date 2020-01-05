import mongoose from 'mongoose';
import AppError from '../../lib/error.js';
import CONST from '../../const.js';

const {HTTP_CODE} = CONST;

mongoose.set('useFindAndModify', false);

const BlogModelInstance = mongoose.model('Blog');
const BlogModel = {
  async get(id = null) {
    if (id) {
      try {
        const blog = await BlogModelInstance.findById(id);
        return blog;
      } catch (e) {
        console.log(e);
        // emitted error in error class with msg & send error response
        return 'Error Processing data';
      }
    }
    try {
      const blogs = await BlogModelInstance.find({});
      return blogs;
    } catch (e) {
      console.log(e);
      // emitted error in error class with msg & send error response
      return 'Error Processing data';
    }
  },
  async create(data = null, id = '') {
    if (!id) {
      return {
        response: 'Error Processing data for unknown user',
        statusCode: HTTP_CODE.inoperableEntry
      };
    }
    try {
      const blogDoc = new BlogModelInstance({...data, user: id});
      await blogDoc.save();
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
      const blog = await BlogModelInstance.findByIdAndUpdate(
          id, body, {new: true, runValidators: true}
      );
      return blog;
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

export default BlogModel;
