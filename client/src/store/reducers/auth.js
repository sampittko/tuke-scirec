import actionTypes from '../actionTypes';

const _initialState = {
  success: false,
  isLoading: false,
  error: null
};

const auth = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      console.log(actionTypes.LOGIN_REQUEST);
      return {
        ...state,
        isLoading: true
      }

    case actionTypes.LOGIN_SUCCESS:
      console.log(actionTypes.LOGIN_SUCCESS);
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null
      };

    case actionTypes.LOGIN_FAILURE:
      console.log(actionTypes.LOGIN_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.LOGOUT_REQUEST:
      console.log(actionTypes.LOGOUT_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.LOGOUT_SUCCESS:
      console.log(actionTypes.LOGOUT_SUCCESS);
      return {
        ...state,
        success: false,
        isLoading: false
      };

    case actionTypes.REGISTER_REQUEST:
      console.log(actionTypes.REGISTER_REQUEST);
      return {
        ...state,
        isLoading: true
      }

    case actionTypes.REGISTER_FAILURE:
      console.log(actionTypes.REGISTER_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.REGISTER_SUCCESS:
      console.log(actionTypes.REGISTER_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null
      };

    default:
      return state
  }
}

export default auth;