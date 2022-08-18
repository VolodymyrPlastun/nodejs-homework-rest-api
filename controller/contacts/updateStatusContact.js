const {Contact, favoriteJoiSchema} = require('../../models');
const createError = require('http-errors');

const updateStatusContact = async (req, res, next) => {
    try {
      const {error} = favoriteJoiSchema.validate(req.body);
      if(error) {
        throw createError(400, "missing field favorite")
      }
      const {id} = req.params;
      const {favorite} = req.body;
    
      const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
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

  module.exports = updateStatusContact;