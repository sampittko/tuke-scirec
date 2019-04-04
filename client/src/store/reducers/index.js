import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import projectReducer from './projectReducer';
import projectVersionReducer from './projectVersionReducer';
import projectVersionReviewReducer from './projectVersionReviewReducer';
import themePickerReducer from './themePickerReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  project: projectReducer,
  projectVersion: projectVersionReducer,
  projectVersionReview: projectVersionReviewReducer,
  themePicker: themePickerReducer,
  file: fileReducer,
});

export default rootReducer;