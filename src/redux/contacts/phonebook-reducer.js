import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as phonebookActions from './phonebook-actions';

const contacts = createReducer([], {
  [phonebookActions.fetchContactsSuccess]: (_, action) => action.payload,
  [phonebookActions.addContactSuccess]: (state, { payload }) => {
    const nameContact = state.map(el => el.name.toLowerCase());

    if (nameContact.includes(payload.name.toLowerCase())) {
      alert(`${payload.name} is already in contacts`);
      return;
    }
    return [...state, payload];
  },

  [phonebookActions.deleteContactSuccess]: (state, { payload }) => {
    return state.filter(({ id }) => id !== payload);
  },
  [phonebookActions.editContactSuccess]: (state, { payload }) => {
    const nameContact = state.map(el => el.name.toLowerCase());

    if (nameContact.includes(payload.name.toLowerCase())) {
      alert(`${payload.name} is already in contacts`);
      return;
    }

    return state;
  },
});

const filter = createReducer('', {
  [phonebookActions.filterContacts]: (_, { payload }) => payload,
});

const error = createReducer(null, {
  [phonebookActions.fetchContactsError]: (_, action) => action.payload,
  [phonebookActions.fetchContactsRequest]: () => null,
});

export default combineReducers({
  contacts,
  filter,
  error,
});
