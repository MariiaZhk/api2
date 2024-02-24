import { Contact } from "../models/Contact.js";

export const listContacts = () => {
  return Contact.find();
};

export const getContactById = async (id) => {
  return Contact.findById(id);
};

export const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

export const addContact = async (data) => {
  return Contact.create(data);
};

export const updateContactById = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data);
};

export const updateStatus = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body);
};
