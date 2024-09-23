import createHttpError from 'http-errors';

import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

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
  const newContact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const removedContact = await deleteContactById(contactId);

  if (!removedContact) {
    throw createHttpError(404, 'Contact is not found');
  }

  res.sendStatus(204);
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

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
