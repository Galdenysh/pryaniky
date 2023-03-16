import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { IData, ISetData } from '../../utils/types';
import styles from './card-edit.module.css';

interface ICardEditProps {
  data: IData;
  handleSubmit: (
    evt: FormEvent<HTMLFormElement>,
    newData: ISetData,
    id?: string,
  ) => Promise<void>;
  padding: boolean;
  error?: boolean;
  textError?: string;
}

function CardEdit(props: ICardEditProps) {
  const { data, handleSubmit, padding, error = false, textError = '' } = props;
  const [documentStatus, setDocumentStatus] = useState<string>('');
  const [employeeNumber, setEmployeeNumber] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');
  const [employeeSignatureName, setEmployeeSignatureName] =
    useState<string>('');
  const [employeeSigDate, setEmployeeSigDate] = useState<string>('');
  const [companySignatureName, setCompanySignatureName] = useState<string>('');
  const [companySigDate, setCompanySigDate] = useState<string>('');
  const [emptyInput, setEmptyInput] = useState<boolean>(true);

  const newData = {
    documentStatus,
    employeeNumber,
    documentType,
    documentName,
    employeeSignatureName,
    employeeSigDate,
    companySignatureName,
    companySigDate,
    emptyInput,
  };

  useEffect(() => {
    setDocumentStatus(data.documentStatus || '');
    setEmployeeNumber(data.employeeNumber || '');
    setDocumentType(data.documentType || '');
    setDocumentName(data.documentName || '');
    setEmployeeSignatureName(data.companySignatureName || '');
    setEmployeeSigDate(data.employeeSigDate || '');
    setCompanySignatureName(data.companySignatureName || '');
    setCompanySigDate(data.companySigDate || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !documentStatus ||
      !employeeNumber ||
      !documentType ||
      !documentName ||
      !employeeSignatureName ||
      !employeeSigDate ||
      !companySignatureName ||
      !companySigDate
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
  }, [
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
  ]);

  return (
    <form
      className={styles.form}
      onSubmit={(evt) => handleSubmit(evt, newData, data.id)}
    >
      {error && <p className={styles.textErr}>{`Ошибка. ${textError}`}</p>}
      <TextField
        className={styles.input}
        label="Введите статус"
        variant="outlined"
        value={documentStatus}
        onChange={(evt) => setDocumentStatus(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите номер"
        variant="outlined"
        value={employeeNumber}
        onChange={(evt) => setEmployeeNumber(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите тип документа"
        variant="outlined"
        value={documentType}
        onChange={(evt) => setDocumentType(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите название документа"
        variant="outlined"
        value={documentName}
        onChange={(evt) => setDocumentName(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите подпись сотрудника"
        variant="outlined"
        value={employeeSignatureName}
        onChange={(evt) => setEmployeeSignatureName(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите дату подписи сотрудника"
        variant="outlined"
        value={employeeSigDate}
        onChange={(evt) => setEmployeeSigDate(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите подпись компании"
        variant="outlined"
        value={companySignatureName}
        onChange={(evt) => setCompanySignatureName(evt.target.value)}
        error={error}
      />
      <TextField
        className={styles.input}
        label="Введите дату подписи компании"
        variant="outlined"
        value={companySigDate}
        onChange={(evt) => setCompanySigDate(evt.target.value)}
        error={error}
      />
      <Button
        className={styles.button}
        type="submit"
        variant="contained"
        disabled={padding || emptyInput}
      >
        {padding ? 'Отправление...' : 'Отправить'}
      </Button>
    </form>
  );
}

export default CardEdit;
