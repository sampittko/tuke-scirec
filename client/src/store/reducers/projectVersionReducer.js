import actionTypes from "../actionTypes";

const _initialState = {
  data: {
    list: [],
    active: null,
  },
  isLoading: false,
  error: null
};

const projectVersion = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.projectVersion.ADD_PROJECT_VERSION_REQUEST:
      console.log(actionTypes.projectVersion.ADD_PROJECT_VERSION_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersion.ADD_PROJECT_VERSION_SUCCESS:
      console.log(actionTypes.projectVersion.ADD_PROJECT_VERSION_SUCCESS);
      return {
        data: {
          ...state.data,
          list: [
            action.addedProjectVersion,
            ...state.data.list
          ],
          active: action.addedProjectVersion,
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.projectVersion.ADD_PROJECT_VERSION_FAILURE:
      console.log(actionTypes.projectVersion.ADD_PROJECT_VERSION_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_REQUEST:
      console.log(actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_SUCCESS:
      console.log(actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_SUCCESS);
      return _initialState;

    case actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_FAILURE:
      console.log(actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_REQUEST:
      console.log(actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_SUCCESS:
      console.log(actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          active: action.latestProjectVersion,
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_FAILURE:
      console.log(actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersion.UPDATE_PROJECT_VERSION_REQUEST:
      console.log(actionTypes.projectVersion.UPDATE_PROJECT_VERSION_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.projectVersion.UPDATE_PROJECT_VERSION_SUCCESS:
      console.log(actionTypes.projectVersion.UPDATE_PROJECT_VERSION_SUCCESS);
      const updatedProjectVersionIndex = state.data.list.findIndex(projectVersion => projectVersion.id === action.updatedProjectVersion.id);
      return {
        ...state,
        data: {
          list: [...state.data.list.slice(0, updatedProjectVersionIndex), action.updatedProjectVersion, ...state.data.list.slice(updatedProjectVersionIndex + 1)],
          active: action.updatedProjectVersion,
        },
        isLoading: false,
      };

    case actionTypes.projectVersion.UPDATE_PROJECT_VERSION_FAILURE:
      console.log(actionTypes.projectVersion.UPDATE_PROJECT_VERSION_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.projectVersion.RESET_PROJECT_VERSION_STATE:
      console.log(actionTypes.projectVersion.RESET_PROJECT_VERSION_STATE);
      return _initialState;

    default:
      return state;
  }
};

export default projectVersion;