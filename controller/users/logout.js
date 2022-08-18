const {User} = require('../../models');
const {Unauthorized} = require('http-errors');

const logout = async (req, res, next) => {
    try {
        const {_id} = req.user;

        if(!_id) {
        throw new Unauthorized('Not authorized');
        }

        await User.findByIdAndUpdate(_id, {token: null})
        res.status(204).json();        
    } catch (error) {
        next(error);
    }

}

module.exports = logout;