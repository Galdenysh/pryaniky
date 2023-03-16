import { HOST } from "./constants";
import { getWithExpiry } from "./localstorage";
import { ILoginData, ISetData } from "./types";

const headersContentType = { 'Content-Type': 'application/json' };
const headersAuthorization = () => ({
  'Content-Type': 'application/json',
  'x-auth': `${getWithExpiry('auth_token')}`,
});

function checkResponse(res: Response) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
};

function request(endpoint: string, options: RequestInit) {
  // Принимает два аргумента: HOST и объект опций, как и `fetch`
  return fetch(`${HOST}${endpoint}`, options).then(checkResponse);
}

// Запрос для авторизации (метод - POST):
export function singIn(data: ILoginData) {
  const options = {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify(data),
  };

  return request('/ru/data/v3/testmethods/docs/login', options);
};

// Запрос для получения массива данных для таблицы (метод - GET):
export function getData() {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request('/ru/data/v3/testmethods/docs/userdocs/get', options);
}

// Запрос для добавления записи (метод - POST):
export function createData(data: ISetData) {
  const options = {
    method: 'POST',
    headers: headersAuthorization(),
    body: JSON.stringify(data),
  };

  return request(`/ru/data/v3/testmethods/docs/userdocs/create`, options);
}

// Запрос для удаления записи(метод - POST):
export function deleteData(id: string) {
  const options = {
    method: 'POST',
    headers: headersAuthorization(),
  };

  return request(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, options);
}

// Запрос для изменения записи(метод POST):
export function setData(id: string, data: ISetData) {
  const options = {
    method: 'POST',
    headers: headersAuthorization(),
    body: JSON.stringify(data),
  };

  return request(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, options);
}