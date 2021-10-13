const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper, validation } = require("../../middlewares");
const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactJoiSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  validation(contactJoiSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
