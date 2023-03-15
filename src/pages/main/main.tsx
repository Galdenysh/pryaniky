import DataCard from '../../components/data-card/data-card';
import Preloader from '../../components/preloader/preloader';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/api-pryaniki';
import { IData, IResponseData } from '../../utils/types';
import styles from './main.module.css';
import Modal from '../../components/modal/modal';
import CardEdit from '../../components/card-edit/card-edit';

function Main() {
  const [cardsData, setCardsData] = useState<IData[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IData>({});

  const closePopup = () => {
    setVisible(false);
  };

  const openPopup = (cardData: IData) => {
    setVisible(true);

    setCurrentData(cardData);
  };

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
            <DataCard
              key={item.id}
              data={item}
              onClick={() => openPopup(item)}
            />
          ))}
        </section>
      ) : (
        <Preloader />
      )}
      {visible && (
        <Modal closePopup={closePopup}>
          <CardEdit data={currentData} />
        </Modal>
      )}
    </main>
  );
}
export default Main;
