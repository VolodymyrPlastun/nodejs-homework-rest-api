const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controller");
const { auth, validation, wrapper } = require("../../middlewares");
const { joiContactSchema, favoriteJoiSchema } = require("../../models");
const router = express.Router();

router.get("/", auth, wrapper(getContacts));

router.get("/:id", auth, wrapper(getContactById));

router.post("/", auth, validation(joiContactSchema), wrapper(addContact));

router.delete("/:id", wrapper(removeContact));

router.put("/:id", validation(joiContactSchema), wrapper(updateContact));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  wrapper(updateStatusContact)
);

module.exports = router;
