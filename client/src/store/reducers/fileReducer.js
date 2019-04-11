import actionTypes from "../actionTypes";

const _initialState = {
  data: {
    lists: [],
  },
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

    case actionTypes.file.DOWNLOAD_FILE_REQUEST:
      console.log(actionTypes.file.DOWNLOAD_FILE_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.file.DOWNLOAD_FILE_SUCCESS:
      console.log(actionTypes.file.DOWNLOAD_FILE_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case actionTypes.file.DOWNLOAD_FILE_FAILURE:
      console.log(actionTypes.file.DOWNLOAD_FILE_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.file.GET_FILES_REQUEST:
      console.log(actionTypes.file.GET_FILES_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.file.GET_FILES_SUCCESS:
      console.log(actionTypes.file.GET_FILES_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [...state.data.lists.slice(0, action.filesIndex), action.files, ...state.data.lists.slice(action.filesIndex + 1)],
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.file.GET_FILES_FAILURE:
      console.log(actionTypes.file.GET_FILES_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.file.DELETE_FILE_REQUEST:
      console.log(actionTypes.file.DELETE_FILE_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.file.DELETE_FILE_SUCCESS:
      console.log(actionTypes.file.DELETE_FILE_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            state.data.lists[action.filesIndex].filter(file => file.id !== action.file.id),
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.file.DELETE_FILE_FAILURE:
      console.log(actionTypes.file.DELETE_FILE_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.file.REMOVE_FILES_AT_INDEX:
      console.log(actionTypes.file.REMOVE_FILES_AT_INDEX);
      return {
        ...state,
        data: {
          ...state.data,
          lists: state.data.lists.filter((fileList, i) => i !== action.filesIndex),
        }
      };

    case actionTypes.file.RESET_FILE_STATE:
      console.log(actionTypes.file.RESET_FILE_STATE);
      return _initialState;

    default:
      return state;
  }
};

export default file;