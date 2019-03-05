import actionTypes from "../actionTypes";
import { sortByCreated } from "../../utils/generalUtils";

const _initialState = {
  data: {
    list: null
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

    case actionTypes.dashboard.ADD_CREATED_PROJECT:
      console.log(actionTypes.dashboard.ADD_CREATED_PROJECT);
      return {
        ...state,
        data: {
          list: [
            ...state.data.list,
            action.createdProject
          ].sort((project1, project2) => sortByCreated(project1, project2))
        },
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
          list: action.projects
            .map(project => project.data())
            .sort((project1, project2) => sortByCreated(project1, project2))
        },
        isLoading: false,
        error: null
      };

    case actionTypes.project.GET_PROJECTS_FAILURE:
      console.log(actionTypes.project.GET_PROJECTS_FAILURE);
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