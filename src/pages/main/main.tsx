import DataCard from '../../components/data-card/data-card';
import Preloader from '../../components/preloader/preloader';
import { FormEvent, useEffect, useState } from 'react';
import { getData, setData } from '../../utils/api-pryaniki';
import { IData, IResponseData, IResponseSet, ISetData } from '../../utils/types';
import styles from './main.module.css';
import Modal from '../../components/modal/modal';
import CardEdit from '../../components/card-edit/card-edit';

function Main() {
  const [cardsData, setCardsData] = useState<IData[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IData>({});
  const [textError, setTextError] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const closePopup = () => {
    setVisible(false);
    setTextError('');
    setError(false);
  };

  const openPopup = (cardData: IData) => {
    setVisible(true);

    setCurrentData(cardData);
  };

  const handleSetSubmit = async (
    evt: FormEvent<HTMLFormElement>,
    id: string | undefined,
    newData: ISetData,
  ) => {
    evt.preventDefault();

    try {
      if (id) {
        const response = await setData(id, newData) as IResponseSet;

        switch (response.error_code) {
          case 0:
            const newArr = cardsData.filter((item) => item.id !== id);

            setCardsData([...newArr, response.data]);

            closePopup();
            break;
          default:
            setError(true);
            setTextError(`Код ошибки ${response.error_code}`);

            break;
        }
      }
    } catch (error) {
      setError(true);
      setTextError('Произошла ошибка запроса');
      console.error(error);
    }
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
          <CardEdit
            data={currentData}
            handleSubmit={handleSetSubmit}
            error={error}
            textError={textError}
          />
        </Modal>
      )}
    </main>
  );
}
export default Main;
