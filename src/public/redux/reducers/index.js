import { combineReducers } from 'redux';

// import all reducer
import engineers from './engineers';
import singleEngineers from './singleEngineers';
import companies from './companies';
import singleCompany from './singleCompany';
import userLogin from './UserLogin';

const rootReducer = combineReducers({
  engineers,
  singleEngineers,
  companies,
  singleCompany,
  userLogin,
});

export default rootReducer;
