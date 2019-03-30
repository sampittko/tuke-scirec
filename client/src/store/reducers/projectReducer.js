import actionTypes from "../actionTypes";

const _initialState = {
  data: {
    list: null,
    active: null,
  },
  isLoading: false,
  error: null
};

const project = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.project.ADD_PROJECT_REQUEST:
      console.log(actionTypes.project.ADD_PROJECT_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.project.ADD_PROJECT_SUCCESS:
      console.log(actionTypes.project.ADD_PROJECT_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: state.data.list ? [
            action.addedProject,
            ...state.data.list
          ] : [action.addedProject],
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.project.ADD_PROJECT_FAILURE:
      console.log(actionTypes.project.ADD_PROJECT_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.project.GET_PROJECTS_REQUEST:
      console.log(actionTypes.project.GET_PROJECTS_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.project.GET_PROJECTS_SUCCESS:
      console.log(actionTypes.project.GET_PROJECTS_SUCCESS);
      return {
        ...state,
        data: {
          ...state.data,
          list: action.projects.length > 0 ? action.projects : null
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.project.GET_PROJECTS_FAILURE:
      console.log(actionTypes.project.GET_PROJECTS_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_REQUEST:
      console.log(actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_SUCCESS:
      console.log(actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_SUCCESS);
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_FAILURE:
      console.log(actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.project.UPDATE_PROJECT_OVERVIEW_REQUEST:
      console.log(actionTypes.project.UPDATE_PROJECT_OVERVIEW_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.project.UPDATE_PROJECT_OVERVIEW_SUCCESS:
      console.log(actionTypes.project.UPDATE_PROJECT_OVERVIEW_SUCCESS);
      const updatedProjectIndex1 = state.data.list.findIndex(project => project.id === action.updatedProject.id);
      return {
        ...state,
        data: {
          list: [...state.data.list.slice(0, updatedProjectIndex1), action.updatedProject, ...state.data.list.slice(updatedProjectIndex1 + 1)],
          active: action.updatedProject,
        },
        isLoading: false,
      };

    case actionTypes.project.UPDATE_PROJECT_OVERVIEW_FAILURE:
      console.log(actionTypes.project.UPDATE_PROJECT_OVERVIEW_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.project.UPDATE_PROJECT_TITLE_REQUEST:
      console.log(actionTypes.project.UPDATE_PROJECT_TITLE_REQUEST);
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.project.UPDATE_PROJECT_TITLE_SUCCESS:
      console.log(actionTypes.project.UPDATE_PROJECT_TITLE_SUCCESS);
      const updatedProjectIndex2 = state.data.list.findIndex(project => project.id === action.updatedProject.id);
      return {
        ...state,
        data: {
          list: [...state.data.list.slice(0, updatedProjectIndex2), action.updatedProject, ...state.data.list.slice(updatedProjectIndex2 + 1)],
          active: action.updatedProject,
        },
        isLoading: false,
      };

    case actionTypes.project.UPDATE_PROJECT_TITLE_FAILURE:
      console.log(actionTypes.project.UPDATE_PROJECT_TITLE_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.project.DELETE_PROJECT_REQUEST:
      console.log(actionTypes.project.DELETE_PROJECT_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.project.DELETE_PROJECT_SUCCESS:
      console.log(actionTypes.project.DELETE_PROJECT_SUCCESS);
      return {
        ...state,
        data: {
          list: state.data.list.filter(project => project.id !== action.deletedProjectId),
          active: null,
        },
        isLoading: false,
      };

    case actionTypes.project.DELETE_PROJECT_FAILURE:
      console.log(actionTypes.project.DELETE_PROJECT_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_REQUEST:
      console.log(actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_SUCCESS:
      console.log(actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_SUCCESS);
      const updatedProjectIndex3 = state.data.list.findIndex(project => project.id === action.updatedProject.id);
      return {
        ...state,
        data: {
          list: [...state.data.list.slice(0, updatedProjectIndex3), action.updatedProject, ...state.data.list.slice(updatedProjectIndex3 + 1)],
          active: action.updatedProject,
        },
        isLoading: false,
      };

    case actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_FAILURE:
      console.log(actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.project.RESET_PROJECT_STATE:
      console.log(actionTypes.project.RESET_PROJECT_STATE);
      return _initialState;

    case actionTypes.project.SET_PROJECT:
      console.log(actionTypes.project.SET_PROJECT);
      return {
        ...state,
        data: {
          ...state.data,
          active: action.project,
        }
      };

    case actionTypes.project.REMOVE_ACTIVE_PROJECT:
      console.log(actionTypes.project.REMOVE_ACTIVE_PROJECT);
      return {
        ...state,
        data: {
          ...state.data,
          active: null,
        }
      };

    default:
      return state;
  }
};

export default project;