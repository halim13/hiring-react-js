import axios from 'axios';

export const fetchDataProfile = (search, sort, order, page, limit) => ({
  type: 'FETCH_DATA_PROFILE',
  payload: axios.get(
    `${process.env.REACT_APP_API_URL}companies/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
  ),
});
