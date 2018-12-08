import { combineReducers } from 'redux';
import user from '../reducers/account/user';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;