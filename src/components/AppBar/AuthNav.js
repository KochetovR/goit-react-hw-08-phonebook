// import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AppBar.module.css';

const AuthNav = () => (
  <div>
    <NavLink
      to="/register"
      className={styles.item}
      activeClassName={styles.activeLink}
    >
      Register
    </NavLink>
    <NavLink
      to="/login"
      className={styles.item}
      activeClassName={styles.activeLink}
    >
      Login
    </NavLink>
  </div>
);

export default AuthNav;
