import { Button } from '@mui/material';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import styles from './header.module.css';
import logo from './images/logo-face.svg';

function Header() {
  const context = useCurrentUser();

  const signOutHandle = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    context.setCurrentUser({
      username: '',
      loggedIn: false,
    });
  };

  return (
    <header className={styles.content}>
      <a href="https://pryaniky.com/">
        <img className={styles.logo} src={logo} alt="Логотип пряники" />
      </a>
      {context.currentUser.loggedIn && (
        <Button
          className={styles.button}
          color="success"
          variant="contained"
          onClick={signOutHandle}
        >
          Выйти
        </Button>
      )}
    </header>
  );
}

export default Header;
