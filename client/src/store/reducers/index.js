import authReducer from './authReducer';
import {combineReducers} from 'redux';
import dashboardReducer from './dashboardReducer';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import projectReducer from './projectReducer';
import themePickerReducer from './themePickerReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  themePicker: themePickerReducer,
  project: projectReducer,
});

export default rootReducer;