const initialState = {
  items: [],
  pages: [],
  isLoadingFirst: true,
  isLoading: true,
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_COMPANIES_PENDING':
    case 'FETCH_DATA_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_DATA_COMPANIES_FULFILLED':
      return {
        ...state,
        items: action.payload.data.data[0].data,
        pages: action.payload.data.data[0].dataPage,
        isLoading: false,
        isLoadingFirst: false,
      };
    default:
      return state;
  }
};
export default engineers;
