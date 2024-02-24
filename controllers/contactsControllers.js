import HttpError from "../helpers/HttpError.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
  updateStatus,
} from "../services/contactsServices.js";
import { ctrlTryCatchWrapper } from "../helpers/ctrlTryCatchWrapper.js";

export const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, `Not Found`);
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Not Found`);
  }
  res.status(200).json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateStatus(id, req.body);
  if (!result) {
    throw HttpError(404, `Not Found`);
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlTryCatchWrapper(getAllContacts),
  getOneContact: ctrlTryCatchWrapper(getOneContact),
  deleteContact: ctrlTryCatchWrapper(deleteContact),
  createContact: ctrlTryCatchWrapper(createContact),
  updateContact: ctrlTryCatchWrapper(updateContact),
  updateStatus: ctrlTryCatchWrapper(updateStatusContact),
};
