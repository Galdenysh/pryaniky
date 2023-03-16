import DataCard from '../../components/data-card/data-card';
import Preloader from '../../components/preloader/preloader';
import { FormEvent, useEffect, useState } from 'react';
import { createData, getData, setData } from '../../utils/api-pryaniki';
import {
  IData,
  IResponseData,
  IResponseSet,
  ISetData,
} from '../../utils/types';
import styles from './main.module.css';
import Modal from '../../components/modal/modal';
import CardEdit from '../../components/card-edit/card-edit';
import { Button } from '@mui/material';

function Main() {
  const [cardsData, setCardsData] = useState<IData[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IData>({});
  const [textError, setTextError] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [handleType, setHandleType] = useState<'create' | 'set'>('create');

  const closePopup = () => {
    setVisible(false);
    setTextError('');
    setError(false);
  };

  const openPopup = (cardData?: IData) => {
    setVisible(true);

    if (cardData) {
      setHandleType('set');
      setCurrentData(cardData);
    } else {
      setHandleType('create');
      setCurrentData({});
    }
  };

  // Ручка для добавления записи
  const handleCreateSubmit = async (
    evt: FormEvent<HTMLFormElement>,
    newData: ISetData,
  ) => {
    evt.preventDefault();

    try {
      const response = (await createData(newData)) as IResponseSet;

      switch (response.error_code) {
        case 0:
          setCardsData([...cardsData, response.data]);

          closePopup();
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

  // Ручка для изменения записи
  const handleSetSubmit = async (
    evt: FormEvent<HTMLFormElement>,
    newData: ISetData,
    id: string | undefined,
  ) => {
    evt.preventDefault();

    try {
      if (id) {
        const response = (await setData(id, newData)) as IResponseSet;

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
    <main className={styles.content}>
      <Button
        className={styles.button}
        variant="contained"
        onClick={() => openPopup()}
      >
        Добавить данные
      </Button>
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
            handleSubmit={handleType === 'create' ? handleCreateSubmit : handleSetSubmit}
            error={error}
            textError={textError}
          />
        </Modal>
      )}
    </main>
  );
}
export default Main;
