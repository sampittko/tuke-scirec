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

    case actionTypes.file.UPLOAD_FILE_REQUEST:
      console.log(actionTypes.file.UPLOAD_FILE_REQUEST);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            [...state.data.lists[action.filesIndex], {
              futureFileName: action.fileName,
            }],
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: true,
      };

    case actionTypes.file.UPLOAD_FILE_SUCCESS:
      console.log(actionTypes.file.UPLOAD_FILE_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            [...state.data.lists[action.filesIndex].slice(0, state.data.lists[action.filesIndex].length - 1), action.uploadedFile],
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.file.UPLOAD_FILE_FAILURE:
      console.log(actionTypes.file.UPLOAD_FILE_FAILURE);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            state.data.lists[action.filesIndex].filter(file => !file.futureFileName),
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: false,
        error: action.error,
      };

    case actionTypes.file.DOWNLOAD_FILE_REQUEST:
      console.log(actionTypes.file.DOWNLOAD_FILE_REQUEST);
      const downloadingFileIndex = state.data.lists[action.filesIndex].findIndex(file => file.id === action.file.id);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            [...state.data.lists[action.filesIndex].slice(0, downloadingFileIndex), {
              id: action.file.id,
              futureFileName: action.file.data().name,
            }, ...state.data.lists[action.filesIndex].slice(downloadingFileIndex + 1)],
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: true,
      };

    case actionTypes.file.DOWNLOAD_FILE_SUCCESS:
      console.log(actionTypes.file.DOWNLOAD_FILE_SUCCESS);
      const downloadingFileIndex2 = state.data.lists[action.filesIndex].findIndex(file => file.id === action.file.id);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            [...state.data.lists[action.filesIndex].slice(0, downloadingFileIndex2), action.file, ...state.data.lists[action.filesIndex].slice(downloadingFileIndex2 + 1)],
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.file.DOWNLOAD_FILE_FAILURE:
      console.log(actionTypes.file.DOWNLOAD_FILE_FAILURE);
      const downloadingFileIndex3 = state.data.lists[action.filesIndex].findIndex(file => file.id === action.file.id);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            [...state.data.lists[action.filesIndex].slice(0, downloadingFileIndex3), action.file, ...state.data.lists[action.filesIndex].slice(downloadingFileIndex3 + 1)],
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
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
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            state.data.lists[action.filesIndex].filter(file => file.id !== action.file.id),
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: true,
      };

    case actionTypes.file.DELETE_FILE_SUCCESS:
      console.log(actionTypes.file.DELETE_FILE_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case actionTypes.file.DELETE_FILE_FAILURE:
      console.log(actionTypes.file.DELETE_FILE_FAILURE);
      return {
        ...state,
        data: {
          ...state.data,
          lists: [
            ...state.data.lists.slice(0, action.filesIndex),
            [...state.data.lists[action.filesIndex], action.file],
            ...state.data.lists.slice(action.filesIndex + 1)
          ],
        },
        isLoading: false,
        error: action.error,
      };

    case actionTypes.file.REMOVE_FILES_AT_INDEX:
      console.log(actionTypes.file.REMOVE_FILES_AT_INDEX);
      return {
        ...state,
        data: {
          ...state.data,
          lists: state.data.lists.filter((filesList, i) => i !== action.filesIndex),
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