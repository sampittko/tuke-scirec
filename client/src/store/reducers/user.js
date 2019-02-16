import actionTypes from '../actionTypes';

const USER_KEY = 'scirecUser';

const _initialState = {
  isLoading: false,
  data: JSON.parse(localStorage.getItem(USER_KEY)),
  error: null
};

const user = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      console.log(actionTypes.LOGIN_REQUEST);
      return {
        ...state,
        isLoading: true
      }

    case actionTypes.LOGIN_SUCCESS:
      console.log(actionTypes.LOGIN_SUCCESS);
      localStorage.setItem(USER_KEY, JSON.stringify(action.user));
      return {
        ...state,
        data: action.user,
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
      localStorage.removeItem(USER_KEY);
      return {
        ...state,
        isLoading: false,
        data: null
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

export default user;