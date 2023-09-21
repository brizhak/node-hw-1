import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleredContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return deleredContact;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};
