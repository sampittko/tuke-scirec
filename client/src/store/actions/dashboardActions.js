import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { dashboardConfig } from '../../config/app/';
import { appErrorCodes } from '../../config/app/errorCodes';

const getDashboardsFailure = error => ({
  type: actionTypes.GET_DASHBOARDS_FAILURE,
  error
})

const getDashboardsSuccess = result => ({
  type: actionTypes.GET_DASHBOARDS_SUCCESS,
  dashboards: result.docs
})

const getDashboardsRequest = () => ({
  type: actionTypes.GET_DASHBOARDS_REQUEST
})

export const getDashboards = currentUserId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getDashboardsRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.DASHBOARDS.ID);

    dashboardsRef
      .where(firestoreCollections.DASHBOARDS.fields.USER, "==", usersRef.doc(currentUserId))
      .get()
    .then(result => {
      dispatch(getDashboardsSuccess(result));
    }).catch(error => {
      console.log(error);
      dispatch(getDashboardsFailure(error));
    });
  }
}

const createDashboardFailure = error => ({
  type: actionTypes.CREATE_DASHBOARD_FAILURE,
  error
})

const createDashboardSuccess = () => ({
  type: actionTypes.CREATE_DASHBOARD_SUCCESS
})

const createDashboardRequest = () => ({
  type: actionTypes.CREATE_DASHBOARD_REQUEST
})

export const createDashboard = newDashboard => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(createDashboardRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.DASHBOARDS.ID);
    const currentUserId = getState().user.data.id;

    dashboardsRef
      .add({
        user: usersRef.doc(currentUserId),
        name: newDashboard.name,
        color: dashboardConfig.defaults.COLOR,
        created: new Date()
    }).then(result => {
      if (newDashboard.default) {
        return usersRef.doc(currentUserId)
          .update({
            defaultDashboard: dashboardsRef.doc(result.id)
          })
      }
      else {
        return Promise.resolve();
      }
    }).then(() => {
      dispatch(createDashboardSuccess());
    }).catch(error => {
      console.log(error);
      dispatch(createDashboardFailure(error));
    });
  }
}