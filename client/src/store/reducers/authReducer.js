import actionTypes from '../actionTypes';

const USER_KEY = "scirecUser";

const _initialState = {
  success: false,
  isLoading: false,
  error: null
};

const auth = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.auth.PASSWORD_LOGIN_REQUEST:
      // console.log(actionTypes.auth.PASSWORD_LOGIN_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.auth.PASSWORD_LOGIN_SUCCESS:
      // console.log(actionTypes.auth.PASSWORD_LOGIN_SUCCESS);
      sessionStorage.setItem(USER_KEY, action.token);
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null
      };

    case actionTypes.auth.PASSWORD_LOGIN_FAILURE:
      // console.log(actionTypes.auth.PASSWORD_LOGIN_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.auth.PROVIDER_LOGIN_REQUEST:
      // console.log(actionTypes.auth.PROVIDER_LOGIN_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.auth.PROVIDER_LOGIN_SUCCESS:
      // console.log(actionTypes.auth.PROVIDER_LOGIN_SUCCESS);
      sessionStorage.setItem(USER_KEY, action.token);
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null
      };

    case actionTypes.auth.PROVIDER_LOGIN_FAILURE:
      // console.log(actionTypes.auth.PROVIDER_LOGIN_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.auth.LOGOUT_REQUEST:
      // console.log(actionTypes.auth.LOGOUT_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.auth.LOGOUT_SUCCESS:
      // console.log(actionTypes.auth.LOGOUT_SUCCESS);
      sessionStorage.removeItem(USER_KEY);
      return {
        ...state,
        success: false,
        isLoading: false
      };

    case actionTypes.auth.PASSWORD_REGISTER_REQUEST:
      // console.log(actionTypes.auth.PASSWORD_REGISTER_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.auth.PASSWORD_REGISTER_FAILURE:
      // console.log(actionTypes.auth.PASSWORD_REGISTER_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.auth.PASSWORD_REGISTER_SUCCESS:
      // console.log(actionTypes.auth.PASSWORD_REGISTER_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case actionTypes.auth.PROVIDER_REGISTER_REQUEST:
      // console.log(actionTypes.auth.PROVIDER_REGISTER_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.auth.PROVIDER_REGISTER_FAILURE:
      // console.log(actionTypes.auth.PROVIDER_REGISTER_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.auth.PROVIDER_REGISTER_SUCCESS:
      // console.log(actionTypes.auth.PROVIDER_REGISTER_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case actionTypes.auth.RESET_PASSWORD_REQUEST:
      // console.log(actionTypes.auth.RESET_PASSWORD_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.auth.RESET_PASSWORD_FAILURE:
      // console.log(actionTypes.auth.RESET_PASSWORD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.auth.RESET_PASSWORD_SUCCESS:
      // console.log(actionTypes.auth.RESET_PASSWORD_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case actionTypes.auth.GET_AUTH:
      // console.log(actionTypes.auth.GET_AUTH);
      const sessionAccessToken = sessionStorage.getItem(USER_KEY);
      return {
        ...state,
        success: sessionAccessToken && action.auth.currentUser ? sessionAccessToken === action.auth.currentUser.ra : false
      };

    case actionTypes.auth.RESET_AUTH_STATE:
      // console.log(actionTypes.auth.RESET_AUTH_STATE);
      sessionStorage.removeItem(USER_KEY);
      return _initialState;

    default:
      return state
  }
};

export default auth;