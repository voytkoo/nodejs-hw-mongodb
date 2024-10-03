import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';

import { createPagination } from '../utils/createPagination.js';

export const getAllContacts = ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const contactQuery = ContactsCollection.find();

  if (filter.type) {
    contactQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = ContactsCollection.find()
    .merge(contactQuery)
    .countDocuments();
  const contacts = contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = createPagination(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export const deleteContactById = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);

export const updateContact = (id, contactData) =>
  ContactsCollection.findByIdAndUpdate(id, contactData, { new: true });
