import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import authOperations from '../../redux/auth/auth-operations';
import defaultAvatar from './default-avatar.png';

import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const email = useSelector(authSelectors.getUserEmail);
  const avatar = defaultAvatar;

  return (
    <>
      {email !== null && (
        <div className={styles.userBox}>
          <img
            src={avatar}
            alt="user"
            width="30"
            className={styles.userAvatar}
          />
          <span className={styles.userGreeting}>
            Welcome, <span className={styles.userEmail}>{email}</span>
          </span>
          <button
            className={styles.btnLogout}
            type="button"
            onClick={() => dispatch(authOperations.logOut())}
          >
            LogOut
          </button>
        </div>
      )}
    </>
  );
}
