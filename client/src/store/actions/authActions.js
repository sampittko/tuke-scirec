import actionTypes from '../actionTypes';
import { dashboardConfig } from '../../config/app';
import firestoreCollections from '../../config/firebase/collections';
import { getRouteFromString } from '../../utils/appConfigUtils';

const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  error
})

const loginSuccess = result => ({
  type: actionTypes.LOGIN_SUCCESS,
  token: result.user.ra
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
        dispatch(loginSuccess(result))
      }).catch(error => {
        console.log(error);
        dispatch(loginFailure(error));
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
      dispatch(logoutSuccess());
      dispatch({
        type: actionTypes.RESET_DASHBOARD_STATE
      });
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
          title: dashboardConfig.defaultDashboard.TITLE,
          theme: {
            id: dashboardConfig.defaultDashboard.THEME.ID,
            inverted: dashboardConfig.defaultDashboard.THEME.INVERTED
          },
          route: getRouteFromString(dashboardConfig.defaultDashboard.TITLE),
          created: new Date().getTime()
        })
    }).then(result => {
      return usersRef
        .doc(newRegisteredUserId)
        .set({
          defaultDashboard: dashboardsRef.doc(result.id)
        })
    }).then(() => {
      dispatch(registerSuccess());
    }).catch(error => {
      console.log(error);
      dispatch(registerFailure(error));
    });
  }
}

export const getAuth = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_AUTH,
      auth: getState().firebase.auth
    })
  }
}