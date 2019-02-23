import actionTypes from '../actionTypes';

const _initialState = {
  isLoading: false,
  error: null
};

const dashboard = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY_REQUEST:
      console.log(actionTypes.CREATE_CATEGORY_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      console.log(actionTypes.CREATE_CATEGORY_SUCCESS);
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.CREATE_CATEGORY_FAILURE:
      console.log(actionTypes.CREATE_CATEGORY_FAILURE);
      return {
        ...state,
        isLoading: false
      };

    default:
      return state
  }
}

export default dashboard;