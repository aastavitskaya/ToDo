import axios from "axios";
import {TOKEN_REFRESH_URL, TOKEN_URL} from "./consts";
import Cookies from "universal-cookie";


export function fetchData(url, setState, data =[]) {
    const headers = getHeaders();
    axios.get(url, { headers })
        .then(response => {
            // если получаем ответ, то собираем данные в список педа,
            // складываем всё, что было в data и добавляем данные из response
            const newData = [...data, ...response.data.results];

            // если есть ссылка на следующую страницу, переходим по ней рекурсивно вызывая fetchData
            if (response.data.next) {
                fetchData (response.data.next, setState, newData);
            } else {
                // если ссылки нет, то всё, что насобирали во время многочисленных рекурсий, пишем в state
                setState (newData);
            }
        }).catch(error => {
            // если ловим ошибку, просто выводим её в консоль
            setState([])
            console.error(error);
    })
}

function storeToken(access, refresh, setToken) {
  // функция для записи JWT-токенов в cookies и в state
  const cookies = new Cookies();
  cookies.set('token', access);
  cookies.set('refresh', refresh);
  setToken(access);
}

export function getToken(email, password, setToken) {
  // получаем jwt-token с бекенда, передавая email и password
  axios.post(TOKEN_URL, {email: email, password: password})
    .then(response => {
      storeToken(response.data.access, response.data.refresh, setToken);
      console.log('JWT-токен:', response.data.access);
    }).catch(error => {
      console.error(error);
  })
}

export function logout(setToken) {
  // разлогиниваем пользователя, стирая токены из state и cookies
  storeToken('','', setToken);
}

export function getHeaders() {
  // функция получения заголовков для axios
  // если в куках записан токен, добавляем его в заголовки,
  // если нет то увы =)
  const cookies = new Cookies();
  const jwtToken = cookies.get('token');

  let headers = {
    'Content-Type': 'application/json'
  }

  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return headers
}

export function getTokenFromStorage(setToken) {
  // эту функцию дергаем при перезагрузке страницы
  // так как state при перезагрузке стирается, чтобы убедиться, что пользователь авторизован,
  // надо лезть в cookies и искать там, но токены из cookies могут хранится протухшими,
  // поэтому берём refresh и пытаемся по нему получить access, если удалось - отлично
  // нет - просто разлогиниваем пользователя
  const cookies = new Cookies();
  const refresh = cookies.get('refresh');
  const data = {refresh: refresh};
  axios.post(TOKEN_REFRESH_URL, data)
    .then(response => {
      storeToken(response.data.access, refresh, setToken);
  })
    .catch(error => {
      storeToken('','', setToken);
    });
}