const {Contact, joiContactSchema, favoriteJoiSchema} = require('./contact');
const {User, joiUserSchema, joiSubscriptionSchema, joiLoginSchema, joiVerifySchema} = require('./user');

module.exports = {
    Contact,
    joiContactSchema,
    favoriteJoiSchema,
    User,
    joiUserSchema,
    joiSubscriptionSchema,
    joiLoginSchema,
    joiVerifySchema
};
