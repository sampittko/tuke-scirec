import actionTypes from '../actionTypes';

const _initialState = {
  isLoading: false,
  data: null,
  error: null
};

const dashboard = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY_REQUEST:
      console.log(actionTypes.CREATE_CATEGORY_REQUEST);
      return state;

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      console.log(actionTypes.CREATE_CATEGORY_SUCCESS);
      return state;

    case actionTypes.CREATE_CATEGORY_FAILURE:
      console.log(actionTypes.CREATE_CATEGORY_FAILURE);
      return state;

    default:
      return state
  }
}

export default dashboard;