const {Contact, joiContactSchema} = require('../../models');
const createError = require('http-errors');

const addContact = async (req, res, next) => {
  
    try {
      const {error} = joiContactSchema.validate(req.body);
      if(error) {
        throw createError(400, "missing required name field")
      }
      const {_id} = req.user;
      const result = await Contact.create({...req.body, owner: _id})
      res.status(201).json({
        status: 'success',
        code: 201, 
        data: {
            result
    }
      })
  
    } catch (error) {
      next(error);
    }
  }

  module.exports = addContact;