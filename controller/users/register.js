const {User, joiUserSchema} = require('../../models');
const {BadRequest, Conflict} = require('http-errors');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
      const {error} = joiUserSchema.validate(req.body);
      if(error) {
        throw new BadRequest("Enter correct email or password")
      }
      const {email, password} = req.body;
      const user = await User.findOne({email})
      if(user) {
        throw new Conflict("Email in use");
      }
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      const result = await User.create({email, password: hashPassword});
      res.status(201).json({
        status: 'success',
        code: 201, 
        user: {
            email,
            subscription: result.subscription
    }
      })
  
    } catch (error) {
      next(error);
    }
  }

  module.exports = register;