const initialState = {
  items: [],
  isLoadingFirst: true,
  isLoading: true,
};

const singleEngineers = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'FETCH_SINGLE_DATA_ENGINEER_PENDING':
    case 'FETCH_SINGLE_DATA_ENGINEER_REJECTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_SINGLE_DATA_ENGINEER_FULFILLED':
      return {
        ...state,
        items: action.payload.data.engineersData,
        isLoading: false,
        isLoadingFirst: false,
      };
    default:
      return state;
  }
};
export default singleEngineers;
