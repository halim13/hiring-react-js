import axios from 'axios';

export const fetchDataCompanies = (search, sort, order, page, limit) => ({
  type: 'FETCH_DATA_COMPANIES',
  payload: axios.get(
    `${process.env.REACT_APP_API_URL}companies/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
  ),
});

export const fetchSingleData = id => ({
  type: 'FETCH_SINGLE_DATA_COMPANY',
  payload: axios.get(`${process.env.REACT_APP_API_URL}company/${id}`),
});

export const updateCompany = (id, data, config) => ({
  type: 'UPDATE_DATA_COMPANY',
  payload: axios.put(
    `${process.env.REACT_APP_API_URL}company/${id}`,
    data,
    config
  ),
});

export const deleteCompany = id => ({
  type: 'DELETE_DATA_COMPANY',
  payload: axios.delete(`${process.env.REACT_APP_API_URL}company/${id}`),
});
