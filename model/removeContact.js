const fs = require("fs/promises");
const listContacts = require("./listContacts");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex(
    (item) => item.id === contactId || item.id === +contactId
  );
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return "Success remove";
};

module.exports = removeContact;
