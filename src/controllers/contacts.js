import createHttpError from 'http-errors';

import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
    return;
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
  const contactId = req.params.productId;
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
