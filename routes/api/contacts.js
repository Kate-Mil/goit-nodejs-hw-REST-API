// const express = require('express')
import express from "express";
import Joi from "joi";
import * as contactsServer from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const router = express.Router();

const contactAddScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsServer.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsServer.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }
    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsServer.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServer.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} is not found`);
    }
    // res.json(result);
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await contactsServer.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} is not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
