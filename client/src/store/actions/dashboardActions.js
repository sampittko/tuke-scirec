import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';
import { getRouteFromString } from '../../config/app/routes';

const getDashboardsFailure = error => ({
  type: actionTypes.GET_DASHBOARDS_FAILURE,
  error
})

const getDashboardsSuccess = result => ({
  type: actionTypes.GET_DASHBOARDS_SUCCESS,
  dashboards: result.dashboards,
  defaultDashboardId: result.defaultDashboardId
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
    let defaultDashboardId = null;

    usersRef
      .doc(currentUserId).get()
    .then(result => {
      defaultDashboardId = result.data().defaultDashboard.id;
      return dashboardsRef
        .where(firestoreCollections.DASHBOARDS.fields.USER, "==", usersRef.doc(currentUserId))
        .get()
      })
    .then(result => {
      dispatch(getDashboardsSuccess({
          dashboards: result.docs,
          defaultDashboardId
        })
      );
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

const createDashboardSuccess = created => ({
  type: actionTypes.CREATE_DASHBOARD_SUCCESS,
  activeId: created
})

const addCreatedDashboard = createdDashboard => ({
  type: actionTypes.ADD_CREATED_DASHBOARD,
  createdDashboard
})

const createDashboardRequest = () => ({
  type: actionTypes.CREATE_DASHBOARD_REQUEST
})

export const createDashboard = newDashboard => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(createDashboardRequest());

    const firestore = getFirestore();
    const firebase = getFirebase();
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.DASHBOARDS.ID);
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
    }).then(() => {
      dispatch(addCreatedDashboard(createdDashboard));
      return Promise.resolve();
    })
    .then(() => {
      dispatch(createDashboardSuccess(createdDashboard.created));
    }).catch(error => {
      console.log(error);
      dispatch(createDashboardFailure(error));
    });
  }
}

export const changeDashboard = newActiveId => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CHANGE_DASHBOARD,
      activeId: newActiveId
    })
  }
}