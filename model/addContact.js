const fs = require("fs/promises");
const listContacts = require("./listContacts");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContacts = { id: shortid.generate(), name, email, phone };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContacts;
};

module.exports = addContact;
