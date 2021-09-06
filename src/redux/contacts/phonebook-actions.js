import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
// fetch contacts
export const fetchContactsRequest = createAction(
  'contacts/fetchContactsRequest',
);

export const fetchContactsSuccess = createAction(
  'contacts/fetchContactsSuccess',
);

export const fetchContactsError = createAction('contacts/fetchContactsError');

// add contact
export const addContactRequest = createAction('contacts/addContactRequest');

export const addContactSuccess = createAction(
  'contacts/addContactSuccess',
  ({ name, number }) => {
    return {
      payload: {
        name,
        number,
        id: uuidv4(),
      },
    };
  },
);

export const addContactError = createAction('contacts/addContactError');

// delete contact
export const deleteContactRequest = createAction(
  'contacts/deleteContactRequest',
);
export const deleteContactSuccess = createAction(
  'contacts/deleteContactSuccess',
);
export const deleteContactError = createAction('contacts/deleteContactError');

// edit cintact
export const editContactRequest = createAction('contacts/editContactRequest');
export const editContactSuccess = createAction('contacts/editContactSuccess');
export const editContactError = createAction('contacts/editContactError');

// filter contact
export const filterContacts = createAction('phonebook/changeFilter');
