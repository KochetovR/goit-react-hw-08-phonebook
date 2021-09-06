import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from '../redux/auth/auth-operations';

import styles from './styles.module.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);

      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.box}>
      <h1>Enter your registration details</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <label>
          <p className={styles.formText}>Name</p>
          <input
            className={styles.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          <p className={styles.formText}>Email</p>
          <input
            className={styles.formInput}
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </label>

        <label>
          <p className={styles.formText}>Password</p>
          <input
            className={styles.formInput}
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </label>

        <button className={styles.formBtn}>Log in</button>
      </form>
    </div>
  );
};

export default RegisterForm;
