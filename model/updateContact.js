const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");

const contactsPath = path.resolve("./db/contacts.json");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex(
    (contact) => contact.id === Number(contactId) || contact.id === contactId
  );
  if (idx === -1) return null;

  const updatedContact = { ...contacts[idx], ...body };
  contacts[idx] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = updateContact;
