import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import themePickerReducer from './themePickerReducer';
import projectReducer from './projectReducer';
import projectVersionReducer from './projectVersionReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  themePicker: themePickerReducer,
  project: projectReducer,
  projectVersion: projectVersionReducer,
});

export default rootReducer;