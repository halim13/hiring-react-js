import axios from 'axios';

export const UserLogin = token => ({
  type: 'TOKEN_USER',
  payload: token,
});
