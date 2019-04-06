import actionTypes from "../actionTypes";

const _initialState = {
  isLoading: false,
  error: null,
};

const file = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.file.UPLOAD_FILES_REQUEST:
      console.log(actionTypes.file.UPLOAD_FILES_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.file.UPLOAD_FILES_SUCCESS:
      console.log(actionTypes.file.UPLOAD_FILES_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case actionTypes.file.UPLOAD_FILES_FAILURE:
      console.log(actionTypes.file.UPLOAD_FILES_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state
  }
};

export default file;