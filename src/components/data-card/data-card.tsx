import { Button } from '@mui/material';
import { MouseEvent } from 'react';
import { convertDate } from '../../utils/funcs';
import { IData } from '../../utils/types';
import styles from './data-card.module.css';

interface IDataCardProps {
  data: IData;
  onClick: () => void;
  handleRemove: (
    evt: MouseEvent<HTMLButtonElement>,
    id: string | undefined,
  ) => Promise<void>;
  padding: boolean;
}

function DataCard(props: IDataCardProps) {
  const { data, onClick, handleRemove, padding } = props;

  return (
    <article className={styles.content} onClick={onClick}>
      <div className={styles.statusWrap}>
        <p className={styles.status}>{data.documentStatus}</p>
        <p className={styles.text}>{`№ ${data.employeeNumber}`}</p>
      </div>
      <h2 className={styles.title}>{data.documentType}</h2>
      <p className={styles.text}>{data.documentName}</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <p className={styles.text}>{data.employeeSignatureName}</p>
          <p className={`${styles.text} ${styles.mt8}`}>
            {convertDate(data.employeeSigDate)}
          </p>
        </li>
        <li className={styles.listItem}>
          <p className={styles.text}>{data.companySignatureName}</p>
          <p className={`${styles.text} ${styles.mt8}`}>
            {convertDate(data.companySigDate)}
          </p>
        </li>
      </ul>
      <Button
        className={styles.button}
        color="error"
        variant="contained"
        onClick={(evt) => handleRemove(evt, data.id)}
        disabled={padding}
      >
        {padding ? 'Удаление...' : 'Удалить'}
      </Button>
    </article>
  );
}

export default DataCard;
