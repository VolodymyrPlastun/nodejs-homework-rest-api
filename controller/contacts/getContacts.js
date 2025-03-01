const { Contact } = require("../../models");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(favorite ? { owner: _id, favorite} : { owner: _id}, "", {
     skip,
       limit: Number(limit),
 }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getContacts;
