import { HOST } from "./constants";
import { getWithExpiry } from "./localstorage";
import { ILoginData } from "./types";

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

// Login
export function singIn(data: ILoginData) {
  const options = {
    method: 'POST',
    headers: headersContentType,
    body: JSON.stringify(data),
  };

  return request('/ru/data/v3/testmethods/docs/login', options);
};

// Получение данных для карточек
export function getData() {
  const options = {
    method: 'GET',
    headers: headersAuthorization(),
  };

  return request('/ru/data/v3/testmethods/docs/userdocs/get', options);
}