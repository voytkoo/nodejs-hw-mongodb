import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchemaValidation } from '../validation/createContactSchemaValidation.js';
import { updateContactSchemaValidation } from '../validation/updateContactSchemaValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.use('/', authenticate);
contactsRouter.use('/:contactId', isValidId('contactId'));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  validateBody(createContactSchemaValidation),
  ctrlWrapper(createContactController),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));
contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchemaValidation),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
