import styles from './not-found.module.css';

function NotFound() {
  return (
    <main className={styles.content}>
      <h1 className={styles.titleErr}>404</h1>
      <h2 className={styles.titleText}>Страница не найдена</h2>
    </main>
  )
}

export default NotFound;