import actionTypes from '../actionTypes';

const addProjectFailure = () => ({
  type: actionTypes.project.ADD_PROJECT_FAILURE
})

const addProjectSuccess = () => ({
  type: actionTypes.project.ADD_PROJECT_SUCCESS
})

const addProjectRequest = () => ({
  type: actionTypes.project.ADD_PROJECT_REQUEST
})

export const addProject = newProject => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addProjectRequest());
    dispatch(addProjectFailure());
  }
}

const getProjectsFailure = () => ({
  type: actionTypes.project.GET_PROJECTS_FAILURE
})

const getProjectsSuccess = () => ({
  type: actionTypes.project.GET_PROJECTS_SUCCESS
})

const getProjectsRequest = () => ({
  type: actionTypes.project.GET_PROJECTS_REQUEST
})

export const getProjects = dashboardId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getProjectsRequest());
    dispatch(getProjectsFailure());
  }
}