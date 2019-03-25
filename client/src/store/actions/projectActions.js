import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import {getRouteFromString} from '../../utils/appConfigUtils';
import {projectConfig} from "../../config/app";

const addProjectFailure = error => ({
  type: actionTypes.project.ADD_PROJECT_FAILURE,
  error
});

const addProjectSuccess = data => ({
  type: actionTypes.project.ADD_PROJECT_SUCCESS,
  addedProject: data.addedProject
});

const addProjectRequest = () => ({
  type: actionTypes.project.ADD_PROJECT_REQUEST
});

export const addProject = title => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(addProjectRequest());

    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const dashboardId = getState().dashboard.selector.activeId;

    projectsRef
      .add({
        route: getRouteFromString(title),
        created: new Date(),
        modified: new Date(),
        dashboard: dashboardsRef.doc(dashboardId),
        title,
        state: projectConfig.defaultValues.STATE,
        deadline: projectConfig.defaultValues.DEADLINE,
        description: projectConfig.defaultValues.DESCRIPTION,
        recipient: projectConfig.defaultValues.RECIPIENT,
      })
      .then(result => {
        return projectsRef
          .doc(result.id)
          .get()
      })
      .then(result => {
        dispatch(addProjectSuccess({
          addedProject: result
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(addProjectFailure(error));
      })
  }
};

const getProjectsFailure = error => ({
  type: actionTypes.project.GET_PROJECTS_FAILURE,
  error
});

const getProjectsSuccess = data => ({
  type: actionTypes.project.GET_PROJECTS_SUCCESS,
  projects: data.projects
});

const getProjectsRequest = () => ({
  type: actionTypes.project.GET_PROJECTS_REQUEST
});

export const getProjects = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(getProjectsRequest());

    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const dashboardId = getState().dashboard.selector.activeId;

    projectsRef
      .where(firestoreCollections.projects.fields.DASHBOARD, "==", dashboardsRef.doc(dashboardId))
      .orderBy(firestoreCollections.projects.fields.MODIFIED, "desc")
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
};

const deleteProjectsInDashboardFailure = error => ({
  type: actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_FAILURE,
  error
});

const deleteProjectsInDashboardSuccess = () => ({
  type: actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_SUCCESS
});

const deleteProjectsInDashboardRequest = () => ({
  type: actionTypes.project.DELETE_PROJECTS_IN_DASHBOARD_REQUEST
});

export const deleteProjectsInDashboard = () => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteProjectsInDashboardRequest());

    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const dashboardId = getState().dashboard.selector.activeId;

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
};

const updateProjectFailure = error => ({
  type: actionTypes.project.UPDATE_PROJECT_FAILURE,
  error
});

const updateProjectSuccess = data => ({
  type: actionTypes.project.UPDATE_PROJECT_SUCCESS,
  updatedProject: data.updatedProject
});

const updateProjectRequest = () => ({
  type: actionTypes.project.UPDATE_PROJECT_REQUEST
});

export const updateProject = data => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(updateProjectRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const projectId = state.project.data.active.id;

    await projectsRef
      .doc(projectId)
      .update({
        state: data.state,
        deadline: data.deadline,
        recipient: data.recipient,
        description: data.description,
        modified: new Date(),
      })
      .then(() => {
        return projectsRef
          .doc(projectId)
          .get()
      })
      .then(result => {
        dispatch(updateProjectSuccess({
          updatedProject: result
        }))
      })
      .catch(error => {
        console.log(error);
        dispatch(updateProjectFailure(error));
      });
  }
};

export const resetProjectState = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.project.RESET_PROJECT_STATE
    })
  }
};

export const setProject = project => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.project.SET_PROJECT,
      project
    })
  }
};

export const removeActiveProject = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.project.REMOVE_ACTIVE_PROJECT,
    })
  }
};