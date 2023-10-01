// const express = require('express')
import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactAddScheme } from "../../schemas/contact-schemas.js";

const contactAddValidate = validateBody(contactAddScheme);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsController.add);

router.delete("/:contactId", contactsController.delById);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

export default router;
