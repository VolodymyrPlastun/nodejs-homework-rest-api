const express = require("express");
const {
  register,
  login,
  currentUser,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  verify,
} = require("../../controller");
const { auth, validation, wrapper, upload } = require("../../middlewares");
const {
  joiLoginSchema,
  joiUserSchema,
  joiSubscriptionSchema,
  joiVerifySchema,
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

router.patch("/avatars", auth, upload.single("avatar"), wrapper(updateAvatar));

router.post("/verify", validation(joiVerifySchema), wrapper(verify));

router.get("/verify/:verificationToken", wrapper(verifyEmail));

module.exports = router;
