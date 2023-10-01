import * as contactsServer from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await contactsServer.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServer.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} is not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsServer.addContact(req.body);
  res.status(201).json(result);
};

const delById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServer.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} is not found`);
  }
  // res.json(result);
  res.json({ message: "Delete success" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServer.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} is not found`);
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  delById: ctrlWrapper(delById),
  updateById: ctrlWrapper(updateById),
};
