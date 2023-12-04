import axios from "axios";

export function fetchData(url, setState, data =[]) {
    axios.get(url)
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
            console.error(error);
    })
}