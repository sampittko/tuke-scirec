import actionTypes from "../actionTypes";

const _initialState = {
  data: {
    list: [],
  },
  isLoading: false,
  error: null,
};

const projectVersionReview = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_REQUEST:
      console.log(actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_SUCCESS:
      console.log(actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: [
            action.addedProjectVersionReview,
            ...state.data.list
          ],
        },
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_FAILURE:
      console.log(actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_REQUEST:
      console.log(actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_SUCCESS:
      console.log(actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: action.projectVersionReviews,
        },
        isLoading: false,
      };

    case actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_FAILURE:
      console.log(actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_REQUEST:
      console.log(actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_SUCCESS:
      console.log(actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_SUCCESS);
      return _initialState;

    case actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_FAILURE:
      console.log(actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.RESET_PROJECT_VERSION_REVIEW_STATE:
      console.log(actionTypes.projectVersionReview.RESET_PROJECT_VERSION_REVIEW_STATE);
      return _initialState;

    default:
      return state
  }
};

export default projectVersionReview;