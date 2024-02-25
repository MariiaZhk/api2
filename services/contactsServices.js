import { Contact } from "../models/Contact.js";

export const listContacts = () => Contact.find({}, "-createdAt -updatedAt");

export const getContactsListByFilter = (filter, query = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", query);

export const getContactsCountByFilter = (filter) =>
  Contact.countDocuments(filter);

export const getContactById = (id) => Contact.findById(id);

export const getContactByFilter = (filter) => Contact.findOne(filter);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const removeContactByFilter = (filter) =>
  Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const updateContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const updateStatus = (id, body) => Contact.findByIdAndUpdate(id, body);
