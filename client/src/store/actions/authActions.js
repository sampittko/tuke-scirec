import actionTypes from '../actionTypes';
import {dashboardConfig, usersConfig} from '../../config/app';
import firestoreCollections from '../../config/firebase/collections';
import {resetDashboardState} from './dashboardActions';
import {resetProjectState} from './projectActions';
import {resetProjectVersionState} from "./projectVersionActions";
import {resetProjectVersionReviewState} from "./projectVersionReviewActions";

const loginFailure = error => ({
  type: actionTypes.auth.LOGIN_FAILURE,
  error
});

const loginSuccess = result => ({
  type: actionTypes.auth.LOGIN_SUCCESS,
  token: result.user.ra
});

const loginRequest = () => ({
  type: actionTypes.auth.LOGIN_REQUEST
});

export const login = user => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch(loginRequest());

    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        user.email,
        user.password
      )
      .then(result => {
        dispatch(loginSuccess(result))
      })
      .catch(error => {
        console.log(error);
        dispatch(loginFailure(error));
      });
  }
};

const logoutSuccess = () => ({
  type: actionTypes.auth.LOGOUT_SUCCESS
});

const logoutRequest = () => ({
  type: actionTypes.auth.LOGOUT_REQUEST
});

export const logout = () => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch(logoutRequest());
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logoutSuccess());
        dispatch(resetUserDependentEntities());
      });
  }
};

const registerFailure = error => ({
  type: actionTypes.auth.REGISTER_FAILURE,
  error
});

const registerSuccess = () => ({
  type: actionTypes.auth.REGISTER_SUCCESS
});

const registerRequest = () => ({
  type: actionTypes.auth.REGISTER_REQUEST
});

export const register = newUser => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(registerRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    let newRegisteredUserId = '';

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      )
      .then(result => {
        newRegisteredUserId = result.user.uid;
        return firebase
          .auth()
          .signInWithEmailAndPassword(
            newUser.email,
            newUser.password
          )
      })
      .then(() => {
        return dashboardsRef
          .add({
            [firestoreCollections.dashboards.fields.META]: {
              [firestoreCollections.dashboards.fields.meta.AUTHOR_ID]: newRegisteredUserId,
              [firestoreCollections.dashboards.fields.meta.CREATED]: new Date(),
              [firestoreCollections.dashboards.fields.meta.PARENT_ID]: newRegisteredUserId,
            },
            [firestoreCollections.dashboards.fields.THEME]: {
              [firestoreCollections.dashboards.fields.theme.ID]: dashboardConfig.defaultValues.theme.ID,
              [firestoreCollections.dashboards.fields.theme.INVERTED]: dashboardConfig.defaultValues.theme.INVERTED,
            },
            [firestoreCollections.dashboards.fields.TITLE]: dashboardConfig.defaultValues.TITLE,
          })
      })
      .then(result => {
        return usersRef
          .doc(newRegisteredUserId)
          .set({
            [firestoreCollections.users.fields.DEFAULT_DASHBOARD_ID]: result.id,
            [firestoreCollections.users.fields.DASHBOARDS_COUNT]: usersConfig.INITIAL_DASHBOARDS_COUNT,
          })
      })
      .then(() => {
        return firebase
          .auth()
          .signOut()
      })
      .then(() => {
        dispatch(registerSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(registerFailure(error));
      });
  }
};

export const getAuth = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    dispatch({
      type: actionTypes.auth.GET_AUTH,
      auth: firebase.auth()
    })
  }
};

export const resetUserDependentEntities = () => {
  return dispatch => {
    dispatch(resetDashboardState());
    dispatch(resetProjectState());
    dispatch(resetProjectVersionState());
    dispatch(resetProjectVersionReviewState());
  }
};