import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';

const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  error
})

const loginSuccess = result => ({
  type: actionTypes.LOGIN_SUCCESS,
  user: {
    id: result.user.uid,
    email: result.user.email
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
    ).then((result) => {
      dispatch(loginSuccess(result));
    }).catch((error) => {
      dispatch(loginFailure(error));
    });
  }
}

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
})

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch(logoutSuccess());
    });
  }
}

const registerFailure = error => ({
  type: actionTypes.REGISTER_FAILURE,
  error
})

const registerSuccess = result => ({
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
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((result) => {
        return firestore.collection(firestoreCollections.USERS)
          .doc(result.user.uid)
          .set({
            email: newUser.email,
            categories: [{
              id: 0,
              title: "Predvolená kategória",
              projects: [{
                id: firestore.doc("projects/0"),
                title: "Ukážkový projekt"
              }],
              color: 'theme'
            }]
          })
    }).then((result) => {
      dispatch(registerSuccess(result));
    }).catch((error) => {
      dispatch(registerFailure(error));
    });
  }
}