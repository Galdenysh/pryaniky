import DataCard from '../../components/data-card/data-card';
import styles from './main.module.css'
import { response } from '../../utils/mock-api';

function Main() {
  return (
    <main>
      <DataCard data={response.data[0]} />
    </main>
  )
}
export default Main;