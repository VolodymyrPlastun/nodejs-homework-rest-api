const {Contact} = require('../models');
const createError = require('http-errors');

const removeContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Contact.findByIdAndRemove(id);
      if(!result) {
        throw createError(404, `Contact with id ${id} not found`)
      }
      res.json({ 
        status: 'success',
        code: 200,
        message: "contact deleted",
        data: {
          result
        }
       })
    } catch (error) {
      next(error);
    }
    }

    module.exports = removeContact;