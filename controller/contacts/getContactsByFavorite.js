const {Contact} = require('../../models');

const getContactsByFavorite = async (req, res, next) => {
try {
    const { contactId } = req.params;
    const {query} = req;
    const result = await Contact.findByIdAndUpdate(contactId, query, {new: true});
    
    res.json({
        status: 'success',
        code: 200,
      data: {
        result
      } })  
} catch (error) {
    next(error);
}
}

module.exports = getContactsByFavorite;