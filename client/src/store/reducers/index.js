import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import auth from './auth';
import dashboard from './dashboard';
import themePicker from './themePicker';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth,
    dashboard,
    themePicker
});

export default rootReducer;