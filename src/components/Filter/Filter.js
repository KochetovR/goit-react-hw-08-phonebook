import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/contacts/phonebook-selectors';
import * as phonebookActions from '../../redux/contacts/phonebook-actions';
import styles from './Filter.module.css';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChangeFilter = e =>
    dispatch(phonebookActions.filterContacts(e.currentTarget.value));

  return (
    <>
      <label className={styles.filter__label}>
        Find contacts by name
        <input
          className={styles.filter__input}
          value={value}
          onChange={onChangeFilter}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
    </>
  );
};

export default Filter;
