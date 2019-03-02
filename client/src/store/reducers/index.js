import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import auth from './auth/auth';
import dashboard from './dashboard/dashboard';
import themePicker from './themePicker/themePicker';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth,
    dashboard,
    themePicker
});

export default rootReducer;