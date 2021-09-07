import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/contactsOperations';
import { getFilterContacts } from '../../redux/contacts/phonebook-selectors';

import styles from './ContactForm.module.css';

const ContactFrom = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getFilterContacts);

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
    onSubmit({ name: name, number: number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.contact__form}>
        <label className={styles.contact__label}>
          Name
          <input
            className={styles.contact__input}
            value={name}
            onChange={handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={styles.contact__label}>
          Number
          <input
            className={styles.contact__input}
            value={number}
            onChange={handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit" className={styles.contact__button}>
          Add contact
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

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ name, number }) =>
    dispatch(contactsOperations.addContact({ name, number })),
});

export default connect(null, mapDispatchToProps)(ContactFrom);
