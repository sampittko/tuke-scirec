import actionTypes from '../actionTypes';
import {dashboardConfig, userConfig} from '../../config/app';
import firestoreCollections from '../../config/firebase/collections';
import {resetDashboardState} from './dashboardActions';
import {resetProjectState} from './projectActions';
import {resetProjectVersionState} from "./projectVersionActions";
import {resetProjectVersionReviewState} from "./projectVersionReviewActions";

const passwordLoginFailure = error => ({
  type: actionTypes.auth.PASSWORD_LOGIN_FAILURE,
  error
});

const passwordLoginSuccess = result => ({
  type: actionTypes.auth.PASSWORD_LOGIN_SUCCESS,
  token: result.user.ra
});

const passwordLoginRequest = () => ({
  type: actionTypes.auth.PASSWORD_LOGIN_REQUEST
});

export const passwordLogin = user => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch(passwordLoginRequest());

    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        user.email,
        user.password
      )
      .then(result => {
        dispatch(passwordLoginSuccess(result))
      })
      .catch(error => {
        console.log(error);
        dispatch(passwordLoginFailure(error));
      });
  }
};

const providerLoginFailure = error => ({
  type: actionTypes.auth.PROVIDER_LOGIN_FAILURE,
  error
});

const providerLoginSuccess = result => ({
  type: actionTypes.auth.PROVIDER_LOGIN_SUCCESS,
  token: result.user.ra
});

const providerLoginRequest = () => ({
  type: actionTypes.auth.PROVIDER_LOGIN_REQUEST
});

export const providerLogin = authProvider => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(providerLoginRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    let provider = null;
    let providerResult = null;

    switch (authProvider) {
      case userConfig.authProviders.FACEBOOK:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case userConfig.authProviders.TWITTER:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case userConfig.authProviders.GITHUB:
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case userConfig.authProviders.GOOGLE:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      default:
        dispatch(providerLoginFailure());
        return;
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        providerResult = result;
        return usersRef
          .doc(result.user.uid)
          .get();
      })
      .then(async (result) => {
        if (!result.exists) {
          await dispatch(providerRegister(providerResult.user.uid));
        }
        dispatch(providerLoginSuccess(providerResult));
      })
      .catch(error => {
        console.log(error);
        dispatch(providerLoginFailure(error));
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

const passwordRegisterFailure = error => ({
  type: actionTypes.auth.PASSWORD_REGISTER_FAILURE,
  error
});

const passwordRegisterSuccess = () => ({
  type: actionTypes.auth.PASSWORD_REGISTER_SUCCESS
});

const passwordRegisterRequest = () => ({
  type: actionTypes.auth.PASSWORD_REGISTER_REQUEST
});

export const passwordRegister = newUser => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(passwordRegisterRequest());

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
            [firestoreCollections.users.fields.DASHBOARDS_COUNT]: userConfig.INITIAL_DASHBOARDS_COUNT,
          })
      })
      .then(() => {
        return firebase
          .auth()
          .signOut()
      })
      .then(() => {
        dispatch(passwordRegisterSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(passwordRegisterFailure(error));
      });
  }
};

const providerRegisterFailure = error => ({
  type: actionTypes.auth.PROVIDER_REGISTER_FAILURE,
  error
});

const providerRegisterSuccess = () => ({
  type: actionTypes.auth.PROVIDER_REGISTER_SUCCESS
});

const providerRegisterRequest = () => ({
  type: actionTypes.auth.PROVIDER_REGISTER_REQUEST
});

export const providerRegister = newUserId => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(providerRegisterRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);

    await dashboardsRef
      .add({
        [firestoreCollections.dashboards.fields.META]: {
          [firestoreCollections.dashboards.fields.meta.AUTHOR_ID]: newUserId,
          [firestoreCollections.dashboards.fields.meta.CREATED]: new Date(),
          [firestoreCollections.dashboards.fields.meta.PARENT_ID]: newUserId,
        },
        [firestoreCollections.dashboards.fields.THEME]: {
          [firestoreCollections.dashboards.fields.theme.ID]: dashboardConfig.defaultValues.theme.ID,
          [firestoreCollections.dashboards.fields.theme.INVERTED]: dashboardConfig.defaultValues.theme.INVERTED,
        },
        [firestoreCollections.dashboards.fields.TITLE]: dashboardConfig.defaultValues.TITLE,
      })
      .then(result => {
        return usersRef
          .doc(newUserId)
          .set({
            [firestoreCollections.users.fields.DEFAULT_DASHBOARD_ID]: result.id,
            [firestoreCollections.users.fields.DASHBOARDS_COUNT]: userConfig.INITIAL_DASHBOARDS_COUNT,
          })
      })
      .then(() => {
        dispatch(providerRegisterSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(providerRegisterFailure(error));
      });
  }
};

const resetPasswordFailure = error => ({
  type: actionTypes.auth.RESET_PASSWORD_FAILURE,
  error
});

const resetPasswordSuccess = () => ({
  type: actionTypes.auth.RESET_PASSWORD_SUCCESS
});

const resetPasswordRequest = () => ({
  type: actionTypes.auth.RESET_PASSWORD_REQUEST
});

export const resetPassword = email => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(resetPasswordRequest());

    const firebase = getFirebase();

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(resetPasswordSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(resetPasswordFailure(error));
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

export const resetAuthState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.auth.RESET_AUTH_STATE,
    })
  }
};