const { NotFound } = require("http-errors");
const { Contact } = require("../models");
const { sendSuccessRes } = require("../helpers");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  sendSuccessRes(res, { contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  sendSuccessRes(res, { result }, 201);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact by id=${contactId} not found`);
  }
  sendSuccessRes(res, { message: "contact deleted" });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
