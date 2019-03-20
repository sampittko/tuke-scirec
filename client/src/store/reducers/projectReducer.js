import actionTypes from "../actionTypes";

const _initialState = {
  data: {
    list: null,
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
          list: [
            action.addedProject,
            ...state.data.list
          ]
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

    case actionTypes.project.RESET_PROJECT_STATE:
      console.log(actionTypes.project.RESET_PROJECT_STATE);
      return _initialState;
    
    default:
      return state;
  }
}

export default project;