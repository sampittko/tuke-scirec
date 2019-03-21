import { deleteProjectsInDashboard, resetProjectState } from './projectActions';

import actionTypes from '../actionTypes';
import { dashboardConfig } from '../../config/app';
import firestoreCollections from '../../config/firebase/collections';
import { getRouteFromString } from '../../utils/appConfigUtils';

const getDashboardsFailure = error => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_FAILURE,
  error
})

const getDashboardsSuccess = data => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_SUCCESS,
  dashboards: data.dashboards,
  defaultDashboard: data.defaultDashboard
})

const getDashboardsRequest = () => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_REQUEST
})

export const getDashboards = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getDashboardsRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const userId = firebase.auth().currentUser.uid;
    let defaultDashboard = null;

    await usersRef
      .doc(userId)
      .get()
    .then(result => {
      return dashboardsRef
        .doc(result.data().defaultDashboard.id)
        .get()
    })
    .then(result => {
      defaultDashboard = result;
      return dashboardsRef
        .where(firestoreCollections.dashboards.fields.USER, "==", usersRef.doc(userId))
        .orderBy(firestoreCollections.dashboards.fields.CREATED, "desc")
        .get()
    })
    .then(result => {
      dispatch(getDashboardsSuccess({
          dashboards: result.docs,
          defaultDashboard
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

const createDashboardSuccess = data => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_SUCCESS,
  createdDashboard: data.createdDashboard
})

const addCreatedDashboard = data => ({
  type: actionTypes.dashboard.ADD_CREATED_DASHBOARD,
  createdDashboard: data.createdDashboard,
  isDefault: data.isDefault
})

const createDashboardRequest = () => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_REQUEST
})

export const createDashboard = newDashboard => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(createDashboardRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const userId = firebase.auth().currentUser.uid;
    let createdDashboard = null;

    dashboardsRef
      .add({
        route: getRouteFromString(newDashboard.title),
        theme: newDashboard.theme,
        created: new Date(),
        title: newDashboard.title,
        user: usersRef.doc(userId),
      })
    .then(result => {
      return dashboardsRef
        .doc(result.id)
        .get()
    })
    .then(result => {
      createdDashboard = result;
      if (newDashboard.default) {
        return usersRef
          .doc(userId)
          .update({
            defaultDashboard: dashboardsRef.doc(result.id)
          })
      }
      else {
        return Promise.resolve();
      }
    })
    .then(() => {
      dispatch(addCreatedDashboard({
        createdDashboard,
        isDefault: newDashboard.default,
      }));
      dispatch(createDashboardSuccess({
        createdDashboard
      }));
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

export const updateDashboard = (newDefaultDashboardId, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(updateDashboardRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const state = getState();
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const userId = firebase.auth().currentUser.uid;
    const dashboardId = state.dashboard.selector.activeId;
    const prevDefault = state.dashboard.selector.activeId === state.dashboard.data.default.id;

    if (data.default !== prevDefault) {
      await usersRef
        .doc(userId)
        .update({
          defaultDashboard: dashboardsRef.doc(newDefaultDashboardId === "" ? dashboardId : newDefaultDashboardId)
        })
      .catch(error => {
        console.log(error);
        dispatch(updateDashboardFailure(error));
        return;
      });
    }
    
    dashboardsRef
      .doc(dashboardId)
      .update({
        title: data.title,
        route: getRouteFromString(data.title),
        theme: data.theme,
      })
    .then(() => {
      dispatch(getDashboards());
      dispatch(updateDashboardSuccess());
    })
    .catch(error => {
      console.log(error);
      dispatch(updateDashboardFailure(error));
    });
  }
}

const deleteDashboardFailure = error => ({
  type: actionTypes.dashboard.DELETE_DASHBOARD_FAILURE,
  error
})

const deleteDashboardSuccess = data => ({
  type: actionTypes.dashboard.DELETE_DASHBOARD_SUCCESS,
  newDefaultDashboardId: data.newDefaultDashboardId,
  deletedDashboardId: data.deletedDashboardId
})

const deleteDashboardRequest = () => ({
  type: actionTypes.dashboard.DELETE_DASHBOARD_REQUEST
})

export const deleteDashboard = newDefaultDashboardId => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(deleteDashboardRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const userId = firebase.auth().currentUser.uid;
    const dashboardId = getState().dashboard.selector.activeId;

    await dispatch(deleteProjectsInDashboard(dashboardId));

    if (newDefaultDashboardId !== "") {
      try {
        await usersRef
          .doc(userId)
          .update({
            defaultDashboard: dashboardsRef.doc(newDefaultDashboardId)
          })
      } catch (error) {
        console.error(error);
        dispatch(deleteDashboardFailure(error))
        return;
      }
    }

    dashboardsRef
      .doc(dashboardId)
      .delete()
    .then(() => {
      dispatch(deleteDashboardSuccess({
        newDefaultDashboardId,
        deletedDashboardId: dashboardId
      }));
    })
    .catch(error => {
      console.log(error);
      dispatch(deleteDashboardFailure(error));
    });
  }
}

export const changeDashboard = newActiveId => {
  return (dispatch, getState) => {
    if (newActiveId && newActiveId !== dashboardConfig.MAX_COUNT) {
      dispatch(resetProjectState());
    }
    dispatch({
      type: actionTypes.dashboard.CHANGE_DASHBOARD,
      activeId: newActiveId
    })
  }
}

export const changeDashboardToDefault = () => {
  return (dispatch, getState) => {
    dispatch(resetProjectState());
    dispatch({
      type: actionTypes.dashboard.CHANGE_DASHBOARD_TO_DEFAULT
    })
  }
}

export const resetDashboardState = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.dashboard.RESET_DASHBOARD_STATE
    })
  }
}