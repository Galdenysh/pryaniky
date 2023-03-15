import styles from './header.module.css';
import logo from './images/logo-face.svg';

function Header() {
  return (
    <header className={styles.content}>
      <a href='https://pryaniky.com/'>
        <img className={styles.logo} src={logo} alt="Логотип пряники" />
      </a>
    </header>
  );
}

export default Header;
