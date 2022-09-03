const getContacts = require("./contacts/getContacts");
const getContactById = require("./contacts/getContactById");
const addContact = require("./contacts/addContact");
const removeContact = require("./contacts/removeContact");
const updateContact = require("./contacts/updateContact");
const updateStatusContact = require("./contacts/updateStatusContact");
const register = require("./users/register");
const login = require("./users/login");
const currentUser = require("./users/current");
const logout = require("./users/logout");
const updateSubscription = require("./users/updateSubscription");
const updateAvatar = require("./users/updateAvatar");
const verifyEmail = require("./users/verifyEmail");
const verify = require("./users/verify");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  verify
};
