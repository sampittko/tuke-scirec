import actionTypes from './actionTypes';

export const login = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS
            });
        }).catch((error) => {
            dispatch({
                type: actionTypes.LOGIN_FAILURE,
                error
            });
        });
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({
                type: actionTypes.LOGOUT_SUCCESS,
            });
        });
    }
}