import actionTypes from "../actionTypes";

const _initialState = {
  data: {
    list: [],
  },
  isUpdating: false,
  isLoading: false,
  error: null,
};

const projectVersionReview = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_REQUEST:
      // console.log(actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_SUCCESS:
      // console.log(actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: [
            ...state.data.list,
            action.addedProjectVersionReview
          ],
        },
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_FAILURE:
      // console.log(actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_REQUEST:
      // console.log(actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_SUCCESS:
      // console.log(actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: action.projectVersionReviews,
        },
        isLoading: false,
      };

    case actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_FAILURE:
      // console.log(actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_REQUEST:
      // console.log(actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_SUCCESS:
      // console.log(actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_SUCCESS);
      return _initialState;

    case actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_FAILURE:
      // console.log(actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.DELETE_PROJECT_VERSION_REVIEW_REQUEST:
      // console.log(actionTypes.projectVersionReview.DELETE_PROJECT_VERSION_REVIEW_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersionReview.DELETE_PROJECT_VERSION_REVIEW_SUCCESS:
      // console.log(actionTypes.projectVersionReview.DELETE_PROJECT_VERSION_REVIEW_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: state.data.list.filter(projectVersionReview => projectVersionReview.id !== action.deletedProjectVersionReview.id),
        },
        isLoading: false,
      };

    case actionTypes.projectVersionReview.DELETE_PROJECT_VERSION_REVIEW_FAILURE:
      // console.log(actionTypes.projectVersionReview.DELETE_PROJECT_VERSION_REVIEW_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.UPDATE_PROJECT_VERSION_REVIEW_REQUEST:
      // console.log(actionTypes.projectVersionReview.UPDATE_PROJECT_VERSION_REVIEW_REQUEST);
      return {
        ...state,
        isUpdating: true,
      };

    case actionTypes.projectVersionReview.UPDATE_PROJECT_VERSION_REVIEW_SUCCESS:
      // console.log(actionTypes.projectVersionReview.UPDATE_PROJECT_VERSION_REVIEW_SUCCESS);
      const updatedProjectVersionReviewIndex = state.data.list.findIndex(projectVersionReview => projectVersionReview.id === action.updatedProjectVersionReview.id);
      return {
        ...state,
        data: {
          ...state.data,
          list: [...state.data.list.slice(0, updatedProjectVersionReviewIndex), action.updatedProjectVersionReview, ...state.data.list.slice(updatedProjectVersionReviewIndex + 1)],
        },
        isUpdating: false,
      };

    case actionTypes.projectVersionReview.UPDATE_PROJECT_VERSION_REVIEW_FAILURE:
      // console.log(actionTypes.projectVersionReview.UPDATE_PROJECT_VERSION_REVIEW_FAILURE);
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      };

    case actionTypes.projectVersionReview.RESET_PROJECT_VERSION_REVIEW_STATE:
      // console.log(actionTypes.projectVersionReview.RESET_PROJECT_VERSION_REVIEW_STATE);
      return _initialState;

    default:
      return state
  }
};

export default projectVersionReview;