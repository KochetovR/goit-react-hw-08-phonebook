import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import AuthNav from './AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import authSelectors from '../../redux/auth/auth-selectors';

import styles from './AppBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      <header className={styles.header}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <hr></hr>
    </>
  );
};

export default AppBar;
