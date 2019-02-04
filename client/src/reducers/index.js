import user from '../reducers/account/user';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    user,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;