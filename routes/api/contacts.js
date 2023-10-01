// const express = require('express')
import express from "express";
import * as contactsServer from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsServer.listContacts();
    res.json(result);
  } catch (error) {
    // res.status(500).json({ message: "Server error" });
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServer.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} is not found`);
      // const error = new Error(`Contact with ${contactId} is not found`);
      // error.status = 404;
      // throw error;
      // return res.status(404)
      //   .json({ message: `Contact with ${contactId} is not found` });
    }
    res.json(result);
  } catch (error) {
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contactsServer.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await contactsServer.removeContact(contactId);
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const result = await contactsServer.updateContact(contactId, body);
  res.json(body);
});

export default router;
