import actionTypes from '../actionTypes';

const USER_KEY = "scirecUser";

const _initialState = {
  success: false,
  isLoading: false,
  error: null
}

const auth = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.auth.LOGIN_REQUEST:
      console.log(actionTypes.auth.LOGIN_REQUEST);
      return {
        ...state,
        isLoading: true
      }

    case actionTypes.auth.LOGIN_SUCCESS:
      console.log(actionTypes.auth.LOGIN_SUCCESS);
      sessionStorage.setItem(USER_KEY, action.token);
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null
      }

    case actionTypes.auth.LOGIN_FAILURE:
      console.log(actionTypes.auth.LOGIN_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case actionTypes.auth.LOGOUT_REQUEST:
      console.log(actionTypes.auth.LOGOUT_REQUEST);
      return {
        ...state,
        isLoading: true
      }

    case actionTypes.auth.LOGOUT_SUCCESS:
      console.log(actionTypes.auth.LOGOUT_SUCCESS);
      sessionStorage.removeItem(USER_KEY);
      return {
        ...state,
        success: false,
        isLoading: false
      }

    case actionTypes.auth.REGISTER_REQUEST:
      console.log(actionTypes.auth.REGISTER_REQUEST);
      return {
        ...state,
        isLoading: true
      }

    case actionTypes.auth.REGISTER_FAILURE:
      console.log(actionTypes.auth.REGISTER_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case actionTypes.auth.REGISTER_SUCCESS:
      console.log(actionTypes.auth.REGISTER_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null
      }

    case actionTypes.auth.GET_AUTH:
      console.log(actionTypes.auth.GET_AUTH);
      const sessionAccessToken = sessionStorage.getItem(USER_KEY);
      return {
        ...state,
        success: sessionAccessToken && action.auth.currentUser ? sessionAccessToken === action.auth.currentUser.ra : false
      }

    default:
      return state
  }
}

export default auth;