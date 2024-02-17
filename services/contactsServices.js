import { Contact } from "../models/contact.js";

export function listContacts() {
  return Contact.find();
}

export function getContactById(id) {
  return Contact.findById(id);
}

export async function removeContact(id) {
  return Contact.findByIdAndDelete(id);
}

export function addContact(data) {
  return Contact.create(data);
}

export function updateContactById(id, data) {
  return Contact.findByIdAndUpdate(id, data);
}

export function updateStatus(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}
