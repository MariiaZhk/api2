import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  return contactById || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexToRemove = contacts.findIndex((item) => item.id === contactId);
  if (indexToRemove === -1) {
    return null;
  }
  const result = contacts.splice(indexToRemove, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
