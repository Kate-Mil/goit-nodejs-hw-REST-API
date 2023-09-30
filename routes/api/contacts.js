// const express = require('express')
import express from "express";
import * as contactsServer from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsServer.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ messege: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await contactsServer.getContactById(contactId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ messege: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  const result = await contactsServer.addContact(body);
  res.json(result);
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
