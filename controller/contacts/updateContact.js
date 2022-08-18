const {Contact, joiContactSchema} = require('../../models');
const createError = require('http-errors');

const updateContact = async (req, res, next) => {
    try {
      const {error} = joiContactSchema.validate(req.body);
      if(error) {
        throw createError(400, "missing fields")
      }
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if(!result) {
        throw createError(404, `Contact with id ${id} not found`)
      }
      res.json({ 
        status: 'success',
        code: 200,
        data: {
          result 
        } 
       })  
    } catch (error) {
      next(error);
    }
  }

  module.exports = updateContact;