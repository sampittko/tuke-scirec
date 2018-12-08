import actionTypes from '../../actions/actionTypes';

const user = (state = JSON.parse(sessionStorage.getItem('user')), action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS:
      sessionStorage.setItem('user', JSON.stringify(action.user));
      return action.user;

    case actionTypes.SIGN_OUT_SUCCESS:
      sessionStorage.removeItem('user');
      return null;
  
    default:
      return state
  }
}

export default user;