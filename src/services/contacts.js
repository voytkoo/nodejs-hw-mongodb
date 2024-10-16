import { ContactsCollection } from '../db/models/contact.js';

import { SORT_ORDER } from '../constants/index.js';
import { createPagination } from '../utils/createPagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactQuery = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite || filter.isFavourite === false) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = createPagination(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = (contactId, userId) =>
  ContactsCollection.findOne({ _id: contactId, userId });

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export const updateContact = (contactId, contactData, userId) =>
  ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, contactData, {
    new: true,
  });
export const deleteContactById = (contactId, userId) =>
  ContactsCollection.findOneAndDelete({ _id: contactId, userId });
