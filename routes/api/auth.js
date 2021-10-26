const express = require("express");
const router = express.Router();

const { authenticate, validation, ctrlWrapper } = require("../../middlewares");
const { userJoiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(userJoiSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(userJoiSchema), ctrlWrapper(ctrl.login));

router.get(
  "/logout",
  authenticate,
  validation(userJoiSchema),
  ctrlWrapper(ctrl.logout)
);

router.post("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
