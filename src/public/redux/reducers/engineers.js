const initialState = {
  items: [],
  pages: [],
  isLoadingFirst: true,
  isLoading: true,
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_ENGINEERS_PENDING':
    case 'FETCH_DATA_ENGINEERS_REJECTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_DATA_ENGINEERS_FULFILLED':
      return {
        ...state,
        items: action.payload.data.engineersData,
        pages: action.payload.data.pageDetail,
        isLoading: false,
        isLoadingFirst: false,
      };
    default:
      return state;
  }
};
export default engineers;
