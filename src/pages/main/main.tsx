import DataCard from '../../components/data-card/data-card';
import styles from './main.module.css'
import { response } from '../../utils/mock-api';

function Main() {
  return (
    <main>
      <section className={styles.cards}>
        {response.data.map((item) => (
          <DataCard key={item.id} data={item} />
        ))}
      </section>
    </main>
  )
}
export default Main;