const { NotFound } = require("http-errors");
const contactsOperations = require("../model");
const { sendSuccessRes } = require("../helpers");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  sendSuccessRes(res, { contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
