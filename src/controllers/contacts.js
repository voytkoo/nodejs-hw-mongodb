import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { validatePaginationParams } from '../utils/validatePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilter } from '../utils/parseFilter.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = validatePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilter(req.query);

  const paginatedContacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: paginatedContacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber, contactType',
    );
  }

  const contact = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await deleteContactById(contactId, req.user._id);

  if (!removedContact) {
    next(createHttpError(404, 'Contact is not found'));
    return;
  }

  res.sendStatus(204);
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req.user._id;

  const updatedContact = await updateContact(contactId, body);
  if (!updatedContact) {
    throw createHttpError(404, 'Contact is not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};
