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

  if (filter.type) {
    contactQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
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

  const paginationData = createPagination(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = (contactId, userId) =>
  ContactsCollection.findOne({ _id: contactId, userId });

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export const deleteContactById = (contactId, userId) =>
  ContactsCollection.findOneAndDelete({ _id: contactId, userId });

export const updateContact = async (
  contactId,
  userId,
  contactData,
  options = {},
) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contactData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updatedContact || !updatedContact.value) return null;

  return {
    contact: updatedContact.value,
    isNew: Boolean(updatedContact?.lastErrorObject?.upsert),
  };
};
