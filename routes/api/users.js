const express = require("express");
const {
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
} = require("../../controller");
const { auth, validation, wrapper } = require("../../middlewares");
const {
  joiLoginSchema,
  joiUserSchema,
  joiSubscriptionSchema,
} = require("../../models");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), wrapper(register));

router.post("/login", validation(joiLoginSchema), wrapper(login));

router.get("/current", auth, wrapper(currentUser));

router.get("/logout", auth, wrapper(logout));

router.patch(
  "/:id/subscription",
  auth,
  validation(joiSubscriptionSchema),
  wrapper(updateSubscription)
);

module.exports = router;
