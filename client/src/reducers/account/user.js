import actionTypes from '../../actions/actionTypes';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      // sessionStorage.setItem('user', JSON.stringify(action.user));
      console.log("Login successful");
      return state;
    case actionTypes.LOGIN_FAILURE:
      // sessionStorage.removeItem('user');
      console.log("Login failed");
      return state;
    default:
      return state
  }
}

export default user;