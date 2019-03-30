import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {projectVersionConfig} from "../../config/app";
import {incrementProjectVersionsCount} from "./projectActions";

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

    const firestore = getFirestore();
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);
    const state = getState();
    const activeProject = state.project.data.active;

    projectVersionsRef
      .add({
        project: projectsRef.doc(activeProject.id),
        state: projectVersionConfig.defaultValues.STATE,
        notes: projectVersionConfig.defaultValues.NOTES,
        versionNum: activeProject.data().versionsCount + 1,
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

// TODO remove corresponding reviews
export const deleteVersionsInProject = projectId => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteVersionsInProjectRequest());

    const firestore = getFirestore();
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);
    const projectsRef = firestore.collection(firestoreCollections.projects.ID);

    await projectVersionsRef
      .where(firestoreCollections.projectVersions.fields.PROJECT, "==", projectsRef.doc(projectId))
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
        dispatch(deleteVersionsInProjectSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteVersionsInProjectFailure(error));
      });
  }
};

const getLatestProjectVersionFailure = error => ({
  type: actionTypes.projectVersion.GET_LATEST_PROJECT_FAILURE,
  error
});

const getLatestProjectVersionSuccess = data => ({
  type: actionTypes.projectVersion.GET_LATEST_PROJECT_SUCCESS,
  latestProjectVersion: data.latestProjectVersion,
});

const getLatestProjectVersionRequest = () => ({
  type: actionTypes.projectVersion.GET_LATEST_PROJECT_REQUEST
});

export const getLatestProjectVersion = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(getLatestProjectVersionRequest());

    const firestore = getFirestore();
    const state = getState();
    const activeProject = state.project.data.active;
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    projectVersionsRef
      .where(firestoreCollections.projectVersions.fields.VERSION_NUMBER, "==", activeProject.data().versionsCount)
      .get()
      .then(result => {
        dispatch(getLatestProjectVersionSuccess({
          latestProjectVersion: result.docs[0],
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getLatestProjectVersionFailure(error));
      });
  }
};