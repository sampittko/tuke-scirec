import actionTypes from "../actionTypes";
import firestoreCollections from "../../config/firebase/collections";
import {projectVersionReviewConfig} from "../../config/app";

const addProjectVersionReviewFailure = error => ({
  type: actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_FAILURE,
  error
});

const addProjectVersionReviewSuccess = data => ({
  type: actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_SUCCESS,
  addedProjectVersionReview: data.addedProjectVersionReview,
});

const addProjectVersionReviewRequest = () => ({
  type: actionTypes.projectVersionReview.ADD_PROJECT_VERSION_REVIEW_REQUEST
});

export const addProjectVersionReview = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(addProjectVersionReviewRequest());

    const firestore = getFirestore();
    const projectVersionReviewsRef = firestore.collection(firestoreCollections.projectVersionReviews.ID);
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);
    const state = getState();
    const activeProjectVersion = state.projectVersion.data.active;

    projectVersionReviewsRef
      .add({
        projectVersion: projectVersionsRef.doc(activeProjectVersion.id),
        notes: projectVersionReviewConfig.defaultValues.NOTES,
        reviewer: projectVersionReviewConfig.defaultValues.REVIEWER,
        modified: new Date(),
        created: new Date(),
      })
      .then(result => {
        return projectVersionReviewsRef
          .doc(result.id)
          .get()
      })
      .then(result => {
        dispatch(addProjectVersionReviewSuccess({
          addedProjectVersionReview: result,
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(addProjectVersionReviewFailure(error));
      });
  }
};

const getProjectVersionReviewsFailure = error => ({
  type: actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_FAILURE,
  error
});

const getProjectVersionReviewsSuccess = data => ({
  type: actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_SUCCESS,
  projectVersionReviews: data.projectVersionReviews,
});

const getProjectVersionReviewsRequest = () => ({
  type: actionTypes.projectVersionReview.GET_PROJECT_VERSION_REVIEWS_REQUEST
});

export const getProjectVersionReviews = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(getProjectVersionReviewsRequest());

    const firestore = getFirestore();
    const state = getState();
    const activeProjectVersion = state.projectVersion.data.active;
    const projectVersionReviewsRef = firestore.collection(firestoreCollections.projectVersionReviews.ID);
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    projectVersionReviewsRef
      .where(firestoreCollections.projectVersionReviews.fields.PROJECT_VERSION, "==", projectVersionsRef.doc(activeProjectVersion.id))
      .orderBy(firestoreCollections.projectVersionReviews.fields.CREATED, "desc")
      .get()
      .then(result => {
        dispatch(getProjectVersionReviewsSuccess({
          projectVersionReviews: result.docs
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getProjectVersionReviewsFailure(error));
      });
  }
};

const deleteReviewsInProjectVersionFailure = error => ({
  type: actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_FAILURE,
  error
});

const deleteReviewsInProjectVersionSuccess = () => ({
  type: actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_SUCCESS
});

const deleteReviewsInProjectVersionRequest = () => ({
  type: actionTypes.projectVersionReview.DELETE_REVIEWS_IN_PROJECT_VERSION_REQUEST
});

export const deleteReviewsInProjectVersion = projectVersionId => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteReviewsInProjectVersionRequest());

    const firestore = getFirestore();
    const projectVersionReviewsRef = firestore.collection(firestoreCollections.projectVersionReviews.ID);
    const projectVersionsRef = firestore.collection(firestoreCollections.projectVersions.ID);

    projectVersionReviewsRef
      .where(firestoreCollections.projectVersionReviews.fields.PROJECT_VERSION, "==", projectVersionsRef.doc(projectVersionId))
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
        dispatch(deleteReviewsInProjectVersionSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteReviewsInProjectVersionFailure(error));
      });
  }
};

export const resetProjectVersionReviewState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.projectVersionReview.RESET_PROJECT_VERSION_REVIEW_STATE
    });
  }
};