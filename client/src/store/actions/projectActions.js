import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import {getRouteFromString} from '../../utils/appConfigUtils';
import {projectConfig} from "../../config/app";
import {deleteVersionsInProject} from "./projectVersionActions";

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
        versionsCount: projectConfig.defaultValues.VERSIONS_COUNT,
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

          result.forEach(doc => {
            dispatch(deleteVersionsInProject(doc.id));
          });
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

const updateProjectOverviewFailure = error => ({
  type: actionTypes.project.UPDATE_PROJECT_OVERVIEW_FAILURE,
  error
});

const updateProjectOverviewSuccess = data => ({
  type: actionTypes.project.UPDATE_PROJECT_OVERVIEW_SUCCESS,
  updatedProject: data.updatedProject
});

const updateProjectOverviewRequest = () => ({
  type: actionTypes.project.UPDATE_PROJECT_OVERVIEW_REQUEST
});

export const updateProjectOverview = data => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(updateProjectOverviewRequest());

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
        dispatch(updateProjectOverviewSuccess({
          updatedProject: result
        }))
      })
      .catch(error => {
        console.log(error);
        dispatch(updateProjectOverviewFailure(error));
      });
  }
};

const updateProjectTitleFailure = error => ({
  type: actionTypes.project.UPDATE_PROJECT_TITLE_FAILURE,
  error
});

const updateProjectTitleSuccess = data => ({
  type: actionTypes.project.UPDATE_PROJECT_TITLE_SUCCESS,
  updatedProject: data.updatedProject
});

const updateProjectTitleRequest = () => ({
  type: actionTypes.project.UPDATE_PROJECT_TITLE_REQUEST
});

export const updateProjectTitle = title => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(updateProjectTitleRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const projectId = state.project.data.active.id;

    await projectsRef
      .doc(projectId)
      .update({
        title,
        route: getRouteFromString(title),
        modified: new Date(),
      })
      .then(() => {
        return projectsRef
          .doc(projectId)
          .get()
      })
      .then(result => {
        dispatch(updateProjectTitleSuccess({
          updatedProject: result
        }))
      })
      .catch(error => {
        console.log(error);
        dispatch(updateProjectTitleFailure(error));
      });
  }
};

const deleteProjectFailure = error => ({
  type: actionTypes.project.DELETE_PROJECT_FAILURE,
  error
});

const deleteProjectSuccess = data => ({
  type: actionTypes.project.DELETE_PROJECT_SUCCESS,
  deletedProjectId: data.deletedProjectId
});

const deleteProjectRequest = () => ({
  type: actionTypes.project.DELETE_PROJECT_REQUEST
});
export const deleteProject = () => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteProjectRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const projectId = state.project.data.active.id;

    await dispatch(deleteVersionsInProject(projectId));

    await projectsRef
      .doc(projectId)
      .delete()
      .then(() => {
        dispatch(deleteProjectSuccess({
          deletedProjectId: projectId
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteProjectFailure(error));
      });
  }
};

const incrementProjectVersionsCountFailure = error => ({
  type: actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_FAILURE,
  error
});

const incrementProjectVersionsCountSuccess = data => ({
  type: actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_SUCCESS,
  updatedProject: data.updatedProject,
});

const incrementProjectVersionsCountRequest = () => ({
  type: actionTypes.project.INCREMENT_PROJECT_VERSIONS_COUNT_REQUEST
});

export const incrementProjectVersionsCount = () => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(incrementProjectVersionsCountRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const activeProject = state.project.data.active;

    await projectsRef
      .doc(activeProject.id)
      .update({
        versionsCount: activeProject.data().versionsCount + 1,
      })
      .then(() => {
        return projectsRef
          .doc(activeProject.id)
          .get()
      })
      .then(result => {
        dispatch(incrementProjectVersionsCountSuccess({
          updatedProject: result
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(incrementProjectVersionsCountFailure(error));
      })
  }
};

export const resetProjectState = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.project.RESET_PROJECT_STATE
    });
    dispatch({
      type: actionTypes.projectVersion.RESET_PROJECT_VERSION_STATE
    });
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