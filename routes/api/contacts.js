// const express = require('express')
import express from "express";
import * as contactsServer from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contactsServer.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contactsServer.getContactById(contactId);
  res.json(result);
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
