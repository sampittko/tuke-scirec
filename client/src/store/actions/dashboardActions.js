import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { getRouteFromString } from '../../utils/appConfigUtils';

const getDashboardsFailure = error => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_FAILURE,
  error
})

const getDashboardsSuccess = result => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_SUCCESS,
  dashboards: result.dashboards,
  defaultDashboardId: result.defaultDashboardId
})

const getDashboardsRequest = () => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_REQUEST
})

export const getDashboards = currentUserId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getDashboardsRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    let defaultDashboardId = null;

    usersRef
      .doc(currentUserId)
      .get()
    .then(result => {
      defaultDashboardId = result.data().defaultDashboard.id;
      return dashboardsRef
        .where(firestoreCollections.dashboards.fields.USER, "==", usersRef.doc(currentUserId))
        .get()
      })
    .then(result => {
      dispatch(getDashboardsSuccess({
          dashboards: result.docs,
          defaultDashboardId
        })
      );
    })
    .catch(error => {
      console.log(error);
      dispatch(getDashboardsFailure(error));
    });
  }
}

const createDashboardFailure = error => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_FAILURE,
  error
})

const createDashboardSuccess = createdDashboard => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_SUCCESS,
  createdDashboard
})

const addCreatedDashboard = createdDashboard => ({
  type: actionTypes.dashboard.ADD_CREATED_DASHBOARD,
  createdDashboard
})

const createDashboardRequest = () => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_REQUEST
})

export const createDashboard = newDashboard => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(createDashboardRequest());

    const firestore = getFirestore();
    const firebase = getFirebase();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const currentUserId = firebase.auth().currentUser.uid;

    const createdDashboard = {
      route: getRouteFromString(newDashboard.title),
      theme: newDashboard.theme,
      created: new Date().getTime(),
      title: newDashboard.title,
      user: usersRef.doc(currentUserId)
    }

    dashboardsRef
      .add(createdDashboard)
    .then(result => {
      if (newDashboard.default) {
        return usersRef
          .doc(currentUserId)
          .update({
            defaultDashboard: dashboardsRef.doc(result.id)
          })
      }
      else {
        return Promise.resolve();
      }
    })
    .then(() => {
      dispatch(addCreatedDashboard(createdDashboard));
      dispatch(createDashboardSuccess(createdDashboard));
    })
    .catch(error => {
      console.log(error);
      dispatch(createDashboardFailure(error));
    });
  }
}

export const changeDashboard = newActiveId => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.dashboard.CHANGE_DASHBOARD,
      activeId: newActiveId
    })
  }
}

export const changeDashboardToDefault = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.dashboard.CHANGE_DASHBOARD_TO_DEFAULT
    })
  }
}