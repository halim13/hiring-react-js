import axios from 'axios';

export const fetchData = (search, sort, order, page, limit) => ({
  type: 'FETCH_DATA_ENGINEERS',
  payload: axios.get(
    `${process.env.REACT_APP_API_URL}engineers/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
  ),
});

export const fetchSingleData = id => ({
  type: 'FETCH_SINGLE_DATA_ENGINEER',
  payload: axios.get(`${process.env.REACT_APP_API_URL}engineer/${id}`),
});
