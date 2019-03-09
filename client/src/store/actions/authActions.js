import actionTypes from '../actionTypes';
import { dashboardConfig } from '../../config/app';
import firestoreCollections from '../../config/firebase/collections';
import { getDashboards } from './dashboardActions';
import { getRouteFromString } from '../../utils/appConfigUtils';

const loginFailure = error => ({
  type: actionTypes.auth.LOGIN_FAILURE,
  error
})

const loginSuccess = result => ({
  type: actionTypes.auth.LOGIN_SUCCESS,
  token: result.user.ra
})

const loginRequest = () => ({
  type: actionTypes.auth.LOGIN_REQUEST
})

export const login = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(loginRequest());

    const firebase = getFirebase();

    firebase.auth()
      .signInWithEmailAndPassword(
        user.email,
        user.password
      )
    .then(result => {
      dispatch(getDashboards(result.user.uid));
      dispatch(loginSuccess(result))
    })
    .catch(error => {
      console.log(error);
      dispatch(loginFailure(error));
    });
  }
}

const logoutSuccess = () => ({
  type: actionTypes.auth.LOGOUT_SUCCESS
})

const logoutRequest = () => ({
  type: actionTypes.auth.LOGOUT_REQUEST
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
        type: actionTypes.dashboard.RESET_DASHBOARD_STATE
      });
    });
  }
}

const registerFailure = error => ({
  type: actionTypes.auth.REGISTER_FAILURE,
  error
})

const registerSuccess = () => ({
  type: actionTypes.auth.REGISTER_SUCCESS
})

const registerRequest = () => ({
  type: actionTypes.auth.REGISTER_REQUEST
})

export const register = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(registerRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    let newRegisteredUserId = '';

    firebase.auth()
      .createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
    )
    .then(result => {
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
    })
    .then(result => {
      return usersRef
        .doc(newRegisteredUserId)
        .set({
          defaultDashboard: dashboardsRef.doc(result.id)
        })
    })
    .then(() => {
      dispatch(registerSuccess());
    })
    .catch(error => {
      console.log(error);
      dispatch(registerFailure(error));
    });
  }
}

export const getAuth = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.auth.GET_AUTH,
      auth: getState().firebase.auth
    })
  }
}