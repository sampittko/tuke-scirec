import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import user from './user';
import dashboard from './dashboard';
import themePicker from './themePicker';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user,
    dashboard,
    themePicker
});

export default rootReducer;