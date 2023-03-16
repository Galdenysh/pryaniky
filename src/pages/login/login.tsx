import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { singIn } from '../../utils/api-pryaniki';
import { setWithExpiry } from '../../utils/localstorage';
import { IResponseToken } from '../../utils/types';
import styles from './login.module.css';

function Login() {
  const [valueEmail, setValueEmail] = useState<string>('');
  const [valuePassword, setValuePassword] = useState<string>('');
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [textError, setTextError] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const context = useCurrentUser();

  useEffect(() => {
    if (!valueEmail || !valuePassword) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
  }, [valueEmail, valuePassword]);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setError(false);
    setTextError('');

    try {
      const response = (await singIn({
        username: valueEmail,
        password: valuePassword,
      })) as IResponseToken;

      switch (response.error_code) {
        case 0:
          setWithExpiry('auth_token', response.data.token, 1000 * 60 * 60 * 24);
          setWithExpiry('user', valueEmail, 1000 * 60 * 60 * 24);

          context.setCurrentUser({
            username: valueEmail,
            loggedIn: true,
          });

          break;
        case 2004:
          setError(true);
          setTextError('Неверный логин или пароль');

          break;
        default:
          setError(true);
          setTextError(`Код ошибки ${response.error_code}`);

          break;
      }
    } catch (error) {
      setError(true);
      setTextError('Произошла ошибка запроса');

      console.error(error);
    }
  };

  return (
    <main className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вход</h1>
        <TextField
          className={styles.input}
          label="Имя пользователя"
          variant="filled"
          onChange={(evt) => setValueEmail(evt.target.value)}
          error={error}
          helperText={textError}
        />
        <TextField
          className={styles.input}
          label="Пароль"
          variant="filled"
          onChange={(evt) => setValuePassword(evt.target.value)}
          error={error}
          helperText={textError}
        />
        <Button
          className={styles.button}
          type="submit"
          variant="contained"
          disabled={emptyInput}
        >
          Вход
        </Button>
      </form>
    </main>
  );
}

export default Login;
