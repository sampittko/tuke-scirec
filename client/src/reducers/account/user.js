import actionTypes from '../../actions/actionTypes';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log(actionTypes.LOGIN_SUCCESS);
      return {
        ...state,
        user: action.user
      };
    case actionTypes.LOGIN_FAILURE:
      console.log(actionTypes.LOGIN_FAILURE);
      return {
        ...state,
        user: null
      };
    case actionTypes.LOGOUT_SUCCESS:
      console.log(actionTypes.LOGOUT_SUCCESS);
      return {
        ...state,
        user: null
      };
    case actionTypes.LOGOUT_FAILURE:
      console.log(actionTypes.LOGOUT_FAILURE);
      return state;
    default:
      return state
  }
}

export default user;