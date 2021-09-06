import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.phonebook.contacts;
export const getFilter = state => state.phonebook.filter;

export const getFilterContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  },
);
