import DataCard from '../../components/data-card/data-card';
import styles from './main.module.css';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/api-pryaniki';
import { IData, IResponseData } from '../../utils/types';
import Preloader from '../../components/preloader/preloader';

function Main() {
  const [cardsData, setCardsData] = useState<IData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = (await getData()) as IResponseData;

      setCardsData(response.data);
    }

    fetchData();
  }, []);

  return (
    <main>
      {cardsData.length !== 0 ? (
        <section className={styles.cards}>
          {cardsData.map((item) => (
            <DataCard key={item.id} data={item} />
          ))}
        </section>
      ) : (
        <Preloader />
      )}
    </main>
  );
}
export default Main;
