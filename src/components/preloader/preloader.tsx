import styles from './preloader.module.css';

function Preloader() {
  return (
    <section className={styles.content}>
      <h1 className={styles.title}>Загрузка...</h1>
    </section>
  )
}

export default Preloader;