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
  defaultDashboard: result.defaultDashboard
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
    let defaultDashboardSnapshot = null;

    usersRef
      .doc(currentUserId)
      .get()
    .then(result => {
      return dashboardsRef
        .doc(result.data().defaultDashboard.id)
        .get()
    })
    .then(result => {
      defaultDashboardSnapshot = result;
      return dashboardsRef
        .where(firestoreCollections.dashboards.fields.USER, "==", usersRef.doc(currentUserId))
        .orderBy(firestoreCollections.dashboards.fields.CREATED, "desc")
        .get()
    })
    .then(result => {
      dispatch(getDashboardsSuccess({
          dashboards: result.docs,
          defaultDashboard: defaultDashboardSnapshot
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

const addCreatedDashboard = (createdDashboard, isDefault) => ({
  type: actionTypes.dashboard.ADD_CREATED_DASHBOARD,
  createdDashboard,
  isDefault
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
    let createdDashboardSnapshot = null;

    dashboardsRef
      .add({
        route: getRouteFromString(newDashboard.title),
        theme: newDashboard.theme,
        created: new Date().getTime(),
        title: newDashboard.title,
        user: usersRef.doc(currentUserId)
      })
    .then(result => {
      return dashboardsRef
        .doc(result.id)
        .get()
    })
    .then(result => {
      createdDashboardSnapshot = result;
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
      dispatch(addCreatedDashboard(createdDashboardSnapshot, newDashboard.default));
      dispatch(createDashboardSuccess(createdDashboardSnapshot));
    })
    .catch(error => {
      console.log(error);
      dispatch(createDashboardFailure(error));
    });
  }
}

const updateDashboardFailure = error => ({
  type: actionTypes.dashboard.UPDATE_DASHBOARD_FAILURE,
  error
})

const updateDashboardSuccess = () => ({
  type: actionTypes.dashboard.UPDATE_DASHBOARD_SUCCESS,
})

const updateDashboardRequest = () => ({
  type: actionTypes.dashboard.UPDATE_DASHBOARD_REQUEST
})

export const updateDashboard = (dashboardId, data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(updateDashboardRequest());

    const firestore = getFirestore();
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    
    dashboardsRef
      .doc(dashboardId)
      .update({
        ...data
      })
    .then(() => {
      dispatch(updateDashboardSuccess());
    })
    .catch(error => {
      console.log(error);
      dispatch(updateDashboardFailure(error));
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