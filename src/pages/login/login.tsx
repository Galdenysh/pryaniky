import { Button, TextField } from '@mui/material';
import styles from './login.module.css';

function Login() {
  return (
    <main className={styles.content}>
      <form className={styles.form}>
        <h1 className={styles.title}>Вход</h1>
        <TextField
          className={styles.input}
          label="Имя пользователя"
          variant="filled"
        />
        <TextField className={styles.input} label="Пароль" variant="filled" />
        <Button className={styles.button} variant="contained">
          Вход
        </Button>
      </form>
    </main>
  );
}

export default Login;
