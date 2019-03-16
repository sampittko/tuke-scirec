import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { getRouteFromString } from '../../utils/appConfigUtils';

const addProjectFailure = error => ({
  type: actionTypes.project.ADD_PROJECT_FAILURE,
  error
})

const addProjectSuccess = () => ({
  type: actionTypes.project.ADD_PROJECT_SUCCESS
})

const addProjectRequest = () => ({
  type: actionTypes.project.ADD_PROJECT_REQUEST
})

export const addProject = (newProject, dashboardId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addProjectRequest());

    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);

    const createdProject = {
      route: getRouteFromString(newProject.title),
      created: new Date(),
      title: newProject.title,
      dashboard: dashboardsRef.doc(dashboardId)
    }

    projectsRef
      .add(createdProject)
    .then(() => {
      dispatch({
        type: actionTypes.project.ADD_CREATED_PROJECT,
        createdProject
      });
      dispatch(addProjectSuccess());
    })
    .catch(error => {
      dispatch(addProjectFailure(error));
    })

    dispatch(addProjectFailure());
  }
}

const getProjectsFailure = error => ({
  type: actionTypes.project.GET_PROJECTS_FAILURE,
  error
})

const getProjectsSuccess = result => ({
  type: actionTypes.project.GET_PROJECTS_SUCCESS,
  projects: result.projects
})

const getProjectsRequest = () => ({
  type: actionTypes.project.GET_PROJECTS_REQUEST
})

export const getProjects = dashboardId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getProjectsRequest());

    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);

    projectsRef
      .where(firestoreCollections.projects.fields.DASHBOARD, "==", dashboardsRef.doc(dashboardId))
      .orderBy(firestoreCollections.projects.fields.CREATED, "desc")
      .get()
    .then(result => {
      dispatch(getProjectsSuccess({
        projects: result.docs
      }));
    })
    .catch(error => {
      console.log(error);
      dispatch(getProjectsFailure(error));
    });
  }
}

const deleteProjectsInDashboardFailure = error => ({
  type: actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_FAILURE,
  error
})

const deleteProjectsInDashboardSuccess = () => ({
  type: actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_SUCCESS
})

const deleteProjectsInDashboardRequest = () => ({
  type: actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_REQUEST
})

export const deleteProjectsInDashboard = dashboardId => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(deleteProjectsInDashboardRequest());

    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);

    await projectsRef
      .where(firestoreCollections.projects.fields.DASHBOARD, "==", dashboardsRef.doc(dashboardId))
      .get()
    .then(result => {
      if (!result.docs.empty) {
        let batch = firestore.batch();
        result.forEach(doc => {
          batch.delete(doc.ref);
        });
        batch.commit();
      }
    })
    .then(() => {
      dispatch(deleteProjectsInDashboardSuccess());
    })
    .catch(error => {
      console.log(error);
      dispatch(deleteProjectsInDashboardFailure(error));
    });
  }
}