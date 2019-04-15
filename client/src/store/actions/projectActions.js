import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
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
    const firebase = getFirebase();
    const userId = firebase.auth().currentUser.uid;
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardId = getState().dashboard.selector.activeId;

    projectsRef
      .add({
        [firestoreCollections.projects.fields.OVERVIEW]: {
          [firestoreCollections.projects.fields.overview.STATE]: projectConfig.defaultValues.overview.STATE,
          [firestoreCollections.projects.fields.overview.DEADLINE]: projectConfig.defaultValues.overview.DEADLINE,
          [firestoreCollections.projects.fields.overview.DESCRIPTION]: projectConfig.defaultValues.overview.DESCRIPTION,
          [firestoreCollections.projects.fields.overview.RECIPIENT]: projectConfig.defaultValues.overview.RECIPIENT,
          [firestoreCollections.projects.fields.overview.DEADLINE_VISIBLE]: projectConfig.defaultValues.overview.DEADLINE_VISIBLE,
        },
        [firestoreCollections.projects.fields.META]: {
          [firestoreCollections.projects.fields.meta.AUTHOR_ID]: userId,
          [firestoreCollections.projects.fields.meta.CREATED]: new Date(),
          [firestoreCollections.projects.fields.meta.MODIFIED]: new Date(),
          [firestoreCollections.projects.fields.meta.VERSIONS_COUNT]: projectConfig.defaultValues.meta.VERSIONS_COUNT,
          [firestoreCollections.projects.fields.meta.DELETED_VERSIONS_COUNT]: projectConfig.defaultValues.meta.DELETED_VERSIONS_COUNT,
          [firestoreCollections.projects.fields.meta.PARENT_ID]: dashboardId,
        },
        [firestoreCollections.projects.fields.TITLE]: title,
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

    const firebase = getFirebase();
    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardId = getState().dashboard.selector.activeId;
    const userId = firebase.auth().currentUser.uid;

    projectsRef
      .where(`${firestoreCollections.projects.fields.META}.${firestoreCollections.projects.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.projects.fields.META}.${firestoreCollections.projects.fields.meta.PARENT_ID}`, "==", dashboardId)
      .orderBy(`${firestoreCollections.projects.fields.META}.${firestoreCollections.projects.fields.meta.MODIFIED}`, "desc")
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

    const firebase = getFirebase();
    const firestore = getFirestore();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const dashboardId = getState().dashboard.selector.activeId;
    const userId = firebase.auth().currentUser.uid;

    await projectsRef
      .where(`${firestoreCollections.projects.fields.META}.${firestoreCollections.projects.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.projects.fields.META}.${firestoreCollections.projects.fields.meta.PARENT_ID}`, "==", dashboardId)
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
    const activeProject = state.project.data.active;

    await projectsRef
      .doc(projectId)
      .update({
        [firestoreCollections.projects.fields.META]: {
          ...activeProject.data().meta,
          [firestoreCollections.projects.fields.meta.MODIFIED]: new Date(),
        },
        [firestoreCollections.projects.fields.OVERVIEW]: {
          ...activeProject.data().overview,
          [firestoreCollections.projects.fields.overview.STATE]: data.state,
          [firestoreCollections.projects.fields.overview.DEADLINE]: data.deadline,
          [firestoreCollections.projects.fields.overview.RECIPIENT]: data.recipient,
          [firestoreCollections.projects.fields.overview.DESCRIPTION]: data.description,
          [firestoreCollections.projects.fields.overview.DEADLINE_VISIBLE]: data.deadlineVisible,
        },
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
    const activeProject = state.project.data.active;

    await projectsRef
      .doc(activeProject.id)
      .update({
        [firestoreCollections.projects.fields.META]: {
          ...activeProject.data().meta,
          [firestoreCollections.projects.fields.meta.MODIFIED]: new Date(),
        },
        [firestoreCollections.projects.fields.TITLE]: title,
      })
      .then(() => {
        return projectsRef
          .doc(activeProject.id)
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
        [firestoreCollections.projects.fields.META]: {
          ...activeProject.data().meta,
          [firestoreCollections.projects.fields.meta.VERSIONS_COUNT]: activeProject.data().meta.versionsCount + 1,
          [firestoreCollections.projects.fields.meta.MODIFIED]: new Date(),
        },
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

const incrementDeletedProjectVersionsCountFailure = error => ({
  type: actionTypes.project.INCREMENT_DELETED_PROJECT_VERSIONS_COUNT_FAILURE,
  error
});

const incrementDeletedProjectVersionsCountSuccess = data => ({
  type: actionTypes.project.INCREMENT_DELETED_PROJECT_VERSIONS_COUNT_SUCCESS,
  updatedProject: data.updatedProject,
});

const incrementDeletedProjectVersionsCountRequest = () => ({
  type: actionTypes.project.INCREMENT_DELETED_PROJECT_VERSIONS_COUNT_REQUEST
});

export const incrementDeletedProjectVersionsCount = () => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(incrementDeletedProjectVersionsCountRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const activeProject = state.project.data.active;

    await projectsRef
      .doc(activeProject.id)
      .update({
        [firestoreCollections.projects.fields.META]: {
          ...activeProject.data().meta,
          [firestoreCollections.projects.fields.meta.DELETED_VERSIONS_COUNT]: activeProject.data().meta.deletedVersionsCount + 1,
          [firestoreCollections.projects.fields.meta.MODIFIED]: new Date(),
        },
      })
      .then(() => {
        return projectsRef
          .doc(activeProject.id)
          .get()
      })
      .then(result => {
        dispatch(incrementDeletedProjectVersionsCountSuccess({
          updatedProject: result
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(incrementDeletedProjectVersionsCountFailure(error));
      })
  }
};

const updateProjectModifiedFailure = error => ({
  type: actionTypes.project.UPDATE_PROJECT_MODIFIED_FAILURE,
  error
});

const updateProjectModifiedSuccess = data => ({
  type: actionTypes.project.UPDATE_PROJECT_MODIFIED_SUCCESS,
  updatedProject: data.updatedProject,
});

const updateProjectModifiedRequest = () => ({
  type: actionTypes.project.UPDATE_PROJECT_MODIFIED_REQUEST
});

export const updateProjectModified = () => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(updateProjectModifiedRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const activeProject = state.project.data.active;

    await projectsRef
      .doc(activeProject.id)
      .update({
        [firestoreCollections.projects.fields.META]: {
          ...activeProject.data().meta,
          [firestoreCollections.projects.fields.meta.MODIFIED]: new Date(),
        },
      })
      .then(() => {
        return projectsRef
          .doc(activeProject.id)
          .get()
      })
      .then(result => {
        dispatch(updateProjectModifiedSuccess({
          updatedProject: result
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateProjectModifiedFailure(error));
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

export const setActiveProject = project => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.project.SET_ACTIVE_PROJECT,
      project
    })
  }
};

export const removeActiveProject = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.project.REMOVE_ACTIVE_PROJECT
    });
    dispatch({
      type: actionTypes.projectVersion.RESET_PROJECT_VERSION_STATE
    });
  }
};