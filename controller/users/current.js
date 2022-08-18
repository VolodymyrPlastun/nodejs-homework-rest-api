const {User} = require('../../models');
const {Unauthorized} = require('http-errors');

const currentUser = async (req, res, next) => {
    try {
        const {email} = req.user;
        const user = await User.findOne({email});

        if(!user) {
            throw new Unauthorized('Not authorized')
        }

        res.json({
            status: 'success',
            code: 200,
            data: {
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

module.exports = currentUser;