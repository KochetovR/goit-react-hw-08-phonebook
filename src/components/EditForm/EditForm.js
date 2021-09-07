import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/contactsOperations';
import { getFilterContacts } from '../../redux/contacts/phonebook-selectors';

import styles from './EditForm.module.css';

const ContactFrom = ({ onClose, data }) => {
  const [name, setName] = useState(data.name);
  const [number, setNumber] = useState(data.number);

  const contacts = useSelector(getFilterContacts);

  const dispatch = useDispatch();
  const idContact = data.id;

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameContact = contacts.map(el => el.name.toLowerCase());

    if (nameContact.includes(name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(contactsOperations.editContact(idContact, { name, number }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.edit__form}>
        <label className={styles.edit__label}>
          Name
          <input
            className={styles.edit__input}
            value={name}
            onChange={handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={styles.edit__label}>
          Number
          <input
            className={styles.edit__input}
            value={number}
            onChange={handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit" className={styles.edit__button}>
          Edit contact
        </button>
      </form>
      <button
        className={styles.modal__button__close}
        onClick={onClose}
        type="button"
      >
        Закрыть
      </button>
    </>
  );
};

export default ContactFrom;
