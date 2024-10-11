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
contactsRouter.use(authenticate);
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post(
  '/contacts',
  validateBody(createContactSchemaValidation),
  ctrlWrapper(createContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchemaValidation),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
