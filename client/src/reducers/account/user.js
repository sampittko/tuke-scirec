import actionTypes from '../../actions/actionTypes';

const _initialState = {
  isAuth: false
};

const user = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log(actionTypes.LOGIN_SUCCESS);
      return {
        ...state,
        isAuth: true
      };
    case actionTypes.LOGIN_FAILURE:
      console.log(actionTypes.LOGIN_FAILURE);
      return {
        ...state,
        isAuth: false
      };
    case actionTypes.LOGOUT_SUCCESS:
      console.log(actionTypes.LOGOUT_SUCCESS);
      return {
        ...state,
        isAuth: false
      };
    default:
      return state
  }
}

export default user;