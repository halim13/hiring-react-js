import jwt from 'jwt-decode';
const initialState = {
  user: [],
  isLoadingFirst: true,
  isLoading: true,
};

const UserLogin = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case 'TOKEN_USER_PENDING':
    case 'TOKEN_USER_REJECTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'TOKEN_USER_FULFILLED':
      return {
        ...state,
        user: action.payload.data.data.token
          ? jwt(action.payload.data.data.token)
          : '',
        isLoading: false,
        isLoadingFirst: false,
      };
    default:
      return state;
  }
};
export default UserLogin;
