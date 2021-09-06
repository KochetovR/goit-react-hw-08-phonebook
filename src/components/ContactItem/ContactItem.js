import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterContacts } from '../../redux/contacts/phonebook-selectors';
import contactsOperations from '../../redux/contacts/contactsOperations';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';

import styles from './ContactItem.module.css';

const ContactItem = () => {
  const contacts = useSelector(getFilterContacts);
  const [showModal, setShowModal] = useState(false);
  const [contactData, setContactData] = useState({});

  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(contactsOperations.deleteContact(id));

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  const toggleModal = data => {
    setShowModal(!showModal);
    if (!showModal) {
      setContactData(data);
    }
    dispatch(contactsOperations.fetchContacts());
  };

  return (
    <>
      {contacts.length > 0 &&
        contacts.map(({ name, number, id }) => (
          <li key={id} className={styles.contact__item}>
            <p>
              {name}: <span>{number}</span>
            </p>
            <button
              type="button"
              onClick={() => onDeleteContact(id)}
              className={styles.contact__button}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => toggleModal({ id, name, number })}
            >
              Edit
            </button>
            {showModal && (
              <Modal onClose={toggleModal}>
                <EditForm onClose={toggleModal} data={contactData} />
              </Modal>
            )}
          </li>
        ))}
    </>
  );
};

export default ContactItem;
