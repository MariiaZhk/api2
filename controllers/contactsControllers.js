import HttpError from "../helpers/HttpError.js";
import {
  addContact,
  getContactByFilter,
  getContactsCountByFilter,
  getContactsListByFilter,
  removeContactByFilter,
  updateContactById,
  updateStatus,
} from "../services/contactsServices.js";
import { ctrlTryCatchWrapper } from "../helpers/ctrlTryCatchWrapper.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    filter.favorite = favorite;
  }
  const result = await getContactsListByFilter(filter, { skip, limit });
  const total = await getContactsCountByFilter({ owner });
  res.status(200).json({ total, result });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await getContactByFilter({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await removeContactByFilter({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not Found`);
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await updateContactById({ _id: id, owner }, req.body);
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
