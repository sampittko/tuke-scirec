import actionTypes from "../actionTypes";

const _initialState = {
  data: null,
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
    
    default:
      return state;
  }
}

export default project;