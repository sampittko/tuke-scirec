import actionTypes from '../actionTypes';

const _initialState = {
  isLoading: false,
  data: {
    categories: null,
    projects: null
  },
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

    case actionTypes.GET_CATEGORIES_REQUEST:
      console.log(actionTypes.GET_CATEGORIES_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.GET_CATEGORIES_SUCCESS:
      console.log(actionTypes.GET_CATEGORIES_SUCCESS);
      return {
        ...state,
        data: {
          categories: action.categories.map(category => category.data()),
          projects: state.data.projects
        },
        isLoading: false
      };

    case actionTypes.GET_CATEGORIES_FAILURE:
      console.log(actionTypes.GET_CATEGORIES_FAILURE);
      return {
        ...state,
        isLoading: false
      };

    default:
      return state
  }
}

export default dashboard;