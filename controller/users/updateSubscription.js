const {User, joiSubscriptionSchema} = require('../../models');
const createError = require('http-errors');

const updateSubscription = async (req, res, next) => {
    try {
      const {error} = joiSubscriptionSchema.validate(req.body);
      if(error) {
        throw createError(400, "Choose one of: starter, pro, business")
      }
      const {_id} = req.user;
      const {subscription} = req.body;
    
      const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
      if(!result) {
        throw createError(404, `User with id ${_id} not found`)
      }
      res.json({ 
        status: 'success',
        code: 200,
        data: {
          result: {
            email: result.email,
            subscription: result.subscription
          }
        } 
       })  
    } catch (error) {
     next(error); 
    }
  }

  module.exports = updateSubscription;