import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {projectVersionConfig} from "../../config/app";
import {
  incrementDeletedProjectVersionsCount,
  incrementProjectVersionsCount,
  updateProjectModified
} from "./projectActions";
import {deleteReviewsInProjectVersion} from "./projectVersionReviewActions";
import {deleteFilesInEntity} from "./fileActions";
import {asyncForEach} from "../../utils/appConfigUtils";

const addProjectVersionFailure = error => ({
  type: actionTypes.projectVersion.ADD_PROJECT_VERSION_FAILURE,
  error
});

const addProjectVersionSuccess = data => ({
  type: actionTypes.projectVersion.ADD_PROJECT_VERSION_SUCCESS,
  addedProjectVersion: data.addedProjectVersion,
});

const addProjectVersionRequest = () => ({
  type: actionTypes.projectVersion.ADD_PROJECT_VERSION_REQUEST
});

export const addProjectVersion = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(addProjectVersionRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);
    const state = getState();
    const activeProject = state.project.data.active;

    projectVersionsRef
      .add({
        [firestoreCollections.projectVersions.fields.META]: {
          [firestoreCollections.projectVersions.fields.meta.AUTHOR_ID]: userId,
          [firestoreCollections.projectVersions.fields.meta.MODIFIED]: new Date(),
          [firestoreCollections.projectVersions.fields.meta.CREATED]: new Date(),
          [firestoreCollections.projectVersions.fields.meta.PARENT_ID]: activeProject.id,
        },
        [firestoreCollections.projectVersions.fields.DETAIL]: {
          [firestoreCollections.projectVersions.fields.detail.STATE]: projectVersionConfig.defaultValues.detail.STATE,
          [firestoreCollections.projectVersions.fields.detail.NOTES]: projectVersionConfig.defaultValues.detail.NOTES,
        },
        [firestoreCollections.projectVersions.fields.VERSION_NUMBER]: activeProject.data().meta.versionsCount + 1,
      })
      .then(async (result) => {
        await dispatch(incrementProjectVersionsCount());
        return projectVersionsRef
          .doc(result.id)
          .get()
      })
      .then(result => {
        dispatch(addProjectVersionSuccess({
          addedProjectVersion: result,
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(addProjectVersionFailure(error));
      });
  }
};

const deleteVersionsInProjectFailure = error => ({
  type: actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_FAILURE,
  error
});

const deleteVersionsInProjectSuccess = () => ({
  type: actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_SUCCESS
});

const deleteVersionsInProjectRequest = () => ({
  type: actionTypes.projectVersion.DELETE_VERSIONS_IN_PROJECT_REQUEST
});

export const deleteVersionsInProject = projectId => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteVersionsInProjectRequest());

    const firebase = getFirebase();
    const userId = firebase.auth().currentUser.uid;
    const firestore = getFirestore();
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    await projectVersionsRef
      .where(`${firestoreCollections.projectVersions.fields.META}.${firestoreCollections.projectVersions.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.projectVersions.fields.META}.${firestoreCollections.projectVersions.fields.meta.PARENT_ID}`, "==", projectId)
      .get()
      .then(async (result) => {
        if (!result.docs.empty) {
          let batch = firestore.batch();
          await asyncForEach(result.docs, async (projectVersion) => {
            await dispatch(deleteReviewsInProjectVersion(projectVersion.id));
            await dispatch(deleteFilesInEntity(projectVersion));
            batch.delete(projectVersion.ref);
          });
          return batch.commit();
        }
      })
      .then(() => {
        dispatch(deleteVersionsInProjectSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteVersionsInProjectFailure(error));
      });
  }
};

const getLatestProjectVersionFailure = error => ({
  type: actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_FAILURE,
  error
});

const getLatestProjectVersionSuccess = data => ({
  type: actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_SUCCESS,
  latestProjectVersion: data.latestProjectVersion,
});

const getLatestProjectVersionRequest = () => ({
  type: actionTypes.projectVersion.GET_LATEST_PROJECT_VERSION_REQUEST
});

export const getLatestProjectVersion = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(getLatestProjectVersionRequest());

    const firebase = getFirebase();
    const userId = firebase.auth().currentUser.uid;
    const firestore = getFirestore();
    const state = getState();
    const activeProject = state.project.data.active;
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    projectVersionsRef
      .where(`${firestoreCollections.projectVersions.fields.META}.${firestoreCollections.projectVersions.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.projectVersions.fields.META}.${firestoreCollections.projectVersions.fields.meta.PARENT_ID}`, "==", activeProject.id)
      .orderBy(firestoreCollections.projectVersions.fields.VERSION_NUMBER, "desc")
      .get()
      .then(result => {
        dispatch(getLatestProjectVersionSuccess({
          latestProjectVersion: result.docs.find(projectVersion => projectVersion.data().detail.state !== projectVersionConfig.states.values.DELETED),
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getLatestProjectVersionFailure(error));
      });
  }
};

const updateProjectVersionFailure = error => ({
  type: actionTypes.projectVersion.UPDATE_PROJECT_VERSION_FAILURE,
  error
});

const updateProjectVersionSuccess = data => ({
  type: actionTypes.projectVersion.UPDATE_PROJECT_VERSION_SUCCESS,
  updatedProjectVersion: data.updatedProjectVersion,
});

const updateProjectVersionRequest = () => ({
  type: actionTypes.projectVersion.UPDATE_PROJECT_VERSION_REQUEST
});

export const updateProjectVersion = data => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(updateProjectVersionRequest());

    const firestore = getFirestore();
    const state = getState();
    const activeProjectVersion = state.projectVersion.data.active;
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    await projectVersionsRef
      .doc(activeProjectVersion.id)
      .update({
        [firestoreCollections.projectVersions.fields.META]: {
          ...activeProjectVersion.data().meta,
          [firestoreCollections.projectVersions.fields.meta.MODIFIED]: new Date(),
        },
        [firestoreCollections.projectVersions.fields.DETAIL]: {
          ...activeProjectVersion.data().detail,
          [firestoreCollections.projectVersions.fields.detail.STATE]: data.state,
          [firestoreCollections.projectVersions.fields.detail.NOTES]: data.notes,
        },
      })
      .then(() => {
        return projectVersionsRef
          .doc(activeProjectVersion.id)
          .get()
      })
      .then(result => {
        dispatch(updateProjectModified());
        dispatch(updateProjectVersionSuccess({
          updatedProjectVersion: result
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateProjectVersionFailure(error));
      });
  }
};

const getProjectVersionsFailure = error => ({
  type: actionTypes.projectVersion.GET_PROJECT_VERSIONS_FAILURE,
  error
});

const getProjectVersionsSuccess = data => ({
  type: actionTypes.projectVersion.GET_PROJECT_VERSIONS_SUCCESS,
  projectVersions: data.projectVersions,
});

const getProjectVersionsRequest = () => ({
  type: actionTypes.projectVersion.GET_PROJECT_VERSIONS_REQUEST
});

export const getProjectVersions = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(getProjectVersionsRequest());

    const firebase = getFirebase();
    const userId = firebase.auth().currentUser.uid;
    const firestore = getFirestore();
    const state = getState();
    const activeProject = state.project.data.active;
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    projectVersionsRef
      .where(`${firestoreCollections.projectVersions.fields.META}.${firestoreCollections.projectVersions.fields.meta.AUTHOR_ID}`, "==", userId)
      .where(`${firestoreCollections.projectVersions.fields.META}.${firestoreCollections.projectVersions.fields.meta.PARENT_ID}`, "==", activeProject.id)
      .orderBy(firestoreCollections.projectVersions.fields.VERSION_NUMBER, "desc")
      .get()
      .then(result => {
        dispatch(getProjectVersionsSuccess({
          projectVersions: result.docs
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getProjectVersionsFailure(error));
      });
  }
};

const deleteProjectVersionFailure = error => ({
  type: actionTypes.projectVersion.DELETE_PROJECT_VERSION_FAILURE,
  error
});

const deleteProjectVersionSuccess = data => ({
  type: actionTypes.projectVersion.DELETE_PROJECT_VERSION_SUCCESS,
  deletedProjectVersion: data.deletedProjectVersion,
});

const deleteProjectVersionRequest = () => ({
  type: actionTypes.projectVersion.DELETE_PROJECT_VERSION_REQUEST
});

export const deleteProjectVersion = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteProjectVersionRequest());

    const firestore = getFirestore();
    const state = getState();
    const projectVersion = state.projectVersion.data.active;
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    projectVersionsRef
      .doc(projectVersion.id)
      .update({
        [firestoreCollections.projectVersions.fields.META]: {
          ...projectVersion.data().meta,
          [firestoreCollections.projectVersions.fields.meta.MODIFIED]: new Date(),
        },
        [firestoreCollections.projectVersions.fields.DETAIL]: {
          ...projectVersion.data().detail,
          [firestoreCollections.projectVersions.fields.detail.STATE]: projectVersionConfig.states.values.DELETED,
        },
      })
      .then(() => {
        dispatch(incrementDeletedProjectVersionsCount());
        dispatch(deleteProjectVersionSuccess({
          deletedProjectVersion: projectVersion,
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteProjectVersionFailure(error));
      });
  }
};

export const resetProjectVersionState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.projectVersion.RESET_PROJECT_VERSION_STATE
    });
  }
};

export const setActiveProjectVersion = projectVersion => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.projectVersion.SET_ACTIVE_PROJECT_VERSION,
      projectVersion
    })
  }
};

export const removeActiveProjectVersion = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.projectVersion.REMOVE_ACTIVE_PROJECT_VERSION
    })
  }
};