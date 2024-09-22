import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export const deleteContactById = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);

export const updateContact = (id, contactData) =>
  ContactsCollection.findByIdAndUpdate(id, contactData, { new: true });
