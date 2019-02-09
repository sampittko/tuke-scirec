import actionTypes from './actionTypes';

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

export const login = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch(loginRequest());
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
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