const {User, joiLoginSchema} = require('../../models');
const {Unauthorized, BadRequest} = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;

const login = async (req, res, next) => {
    try {
        const {error} = joiLoginSchema.validate(req.body);
        if(error) {
          throw new BadRequest("Enter correct email or password")
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const passCompare = bcrypt.compare(password, user.password);
        if(!user || !passCompare) {
            throw new Unauthorized("Email or password is wrong")
        }
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '3h'});
        await User.findByIdAndUpdate(user._id, {token})
        res.json({
            status: 'success',
            code: 200,
            data: {
                token,
                user: {
                    email,
                    subscription: user.subscription
                }
            }
        })    
    } catch (error) {
        next(error);
    }
}

module.exports = login;