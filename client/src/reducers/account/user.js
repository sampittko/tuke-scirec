import actionTypes from '../../actions/actionTypes';

const initialState = {};

const user = (previousState = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log(actionTypes.LOGIN_SUCCESS);
      return {
        ...previousState,
        isAuth: true
      };
    case actionTypes.LOGIN_FAILURE:
      console.log(actionTypes.LOGIN_FAILURE);
      return {
        ...previousState,
        isAuth: false
      };
    case actionTypes.LOGOUT_SUCCESS:
      console.log(actionTypes.LOGOUT_SUCCESS);
      return {
        ...previousState,
        isAuth: false
      };
    default:
      return previousState
  }
}

export default user;