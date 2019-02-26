import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { timeouts } from '../../config/app/ui';
import { dashboardConfig } from '../../config/app/';

const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  error
})

const loginSuccess = result => ({
  type: actionTypes.LOGIN_SUCCESS,
  user: {
    id: result.user.uid,
    email: result.user.email,
    token: result.user._lat
  }
})

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST
})

export const login = user => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(loginRequest());

    const firebase = getFirebase();

    firebase.auth()
      .signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(result => {
        setTimeout(() => {
          dispatch(loginSuccess(result))
        }, timeouts.LOGIN_SUCCESS);
      }).catch(error => {
        console.log(error);
        setTimeout(() => {
          dispatch(loginFailure(error));
        }, timeouts.LOGIN_FAILURE);
      });
  }
}

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
})

const logoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST
})

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(logoutRequest());
    const firebase = getFirebase();
    firebase.auth()
      .signOut()
    .then(() => {
      setTimeout(() => {
        dispatch(logoutSuccess());
      }, timeouts.LOGOUT_SUCCESS);
    });
  }
}

const registerFailure = error => ({
  type: actionTypes.REGISTER_FAILURE,
  error
})

const registerSuccess = () => ({
  type: actionTypes.REGISTER_SUCCESS
})

const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST
})

export const register = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(registerRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.DASHBOARDS.ID);
    let newRegisteredUserId = '';

    firebase.auth()
      .createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
    ).then(result => {
      newRegisteredUserId = result.user.uid;
      return dashboardsRef
        .add({
          user: usersRef.doc(newRegisteredUserId),
          name: dashboardConfig.defaultDashboard.TITLE,
          theme: dashboardConfig.defaultDashboard.THEME,
          created: new Date().getTime()
        })
    }).then(result => {
      return usersRef
        .doc(newRegisteredUserId).set({
          email: newUser.email,
          defaultDashboard: dashboardsRef.doc(result.id)
        })
    }).then(() => {
      setTimeout(() => {
        dispatch(registerSuccess());
      }, timeouts.REGISTER_SUCCESS);
    }).catch(error => {
      console.log(error);
      setTimeout(() => {
        dispatch(registerFailure(error));
      }, timeouts.REGISTER_FAILURE);
    });
  }
}