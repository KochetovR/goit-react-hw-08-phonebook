// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as phonebookActions from './phonebook-actions';

const fetchContacts = () => async dispatch => {
  dispatch(phonebookActions.fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(phonebookActions.fetchContactsSuccess(data));
  } catch (error) {
    dispatch(phonebookActions.fetchContactsError(error.message));
  }
};

const addContact = description => dispatch => {
  const contact = {
    ...description,
  };

  dispatch(phonebookActions.addContactRequest(description));

  axios
    .post('/contacts', contact)
    .then(({ data }) => {
      dispatch(phonebookActions.addContactSuccess(data));
    })
    .catch(error => dispatch(phonebookActions.addContactError(error.message)));
};

const deleteContact = contactId => dispatch => {
  dispatch(phonebookActions.deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(phonebookActions.deleteContactSuccess(contactId)))
    .catch(error =>
      dispatch(phonebookActions.deleteContactError(error.message)),
    );
};

const editContact = (contactId, description) => dispatch => {
  const contact = {
    ...description,
  };
  dispatch(phonebookActions.editContactRequest());
  axios
    .patch(`/contacts/${contactId}`, contact)
    .then(({ data }) => dispatch(phonebookActions.editContactSuccess(data)))
    .catch(error => dispatch(phonebookActions.editContactError(error.message)));
};

const contactsOperations = {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
};

export default contactsOperations;

// export const fetchContacts = createAsyncThunk(
//     'contacts/fetchContacts',
//     async (_, {rejectWithValue}) => {
//         try {
//             const contacts = await contactShelfAPI.fetchContacts();
//             return contacts;
//         } catch (error) {
//             return rejectWithValue(error);
//         }

//     },
// );
