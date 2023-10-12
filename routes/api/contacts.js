import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddSchema } from "../../schemas/contact-schemas.js";
import { contactUpdateFavoriteSchema } from "../../schemas/contactUpdateFavoriteSchema.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsController.add);

router.delete("/:contactId", isValidId, contactsController.delById);

router.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  contactAddValidate,
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

export default router;
