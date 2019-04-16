import {deleteProjectsInDashboard, getProjects, resetProjectState} from './projectActions';

import actionTypes from '../actionTypes';
import {dashboardConfig} from '../../config/app';
import firestoreCollections from '../../config/firebase/collections';

const getDashboardsFailure = error => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_FAILURE,
  error
});

const getDashboardsSuccess = data => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_SUCCESS,
  dashboards: data.dashboards,
  defaultDashboard: data.defaultDashboard
});

const getDashboardsRequest = () => ({
  type: actionTypes.dashboard.GET_DASHBOARDS_REQUEST
});

export const getDashboards = () => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
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
          .doc(result.data().defaultDashboardId)
          .get()
      })
      .then(result => {
        defaultDashboard = result;
        return dashboardsRef
          .where(`${firestoreCollections.dashboards.fields.META}.${firestoreCollections.dashboards.fields.meta.AUTHOR_ID}`, "==", userId)
          .where(`${firestoreCollections.dashboards.fields.META}.${firestoreCollections.dashboards.fields.meta.PARENT_ID}`, "==", userId)
          .orderBy(`${firestoreCollections.dashboards.fields.META}.${firestoreCollections.dashboards.fields.meta.CREATED}`, "desc")
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
};

const createDashboardFailure = error => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_FAILURE,
  error
});

const createDashboardSuccess = data => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_SUCCESS,
  createdDashboard: data.createdDashboard
});

const addCreatedDashboard = data => ({
  type: actionTypes.dashboard.ADD_CREATED_DASHBOARD,
  createdDashboard: data.createdDashboard,
  isDefault: data.isDefault
});

const createDashboardRequest = () => ({
  type: actionTypes.dashboard.CREATE_DASHBOARD_REQUEST
});

export const createDashboard = newDashboard => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(createDashboardRequest());

    const firebase = getFirebase();
    const firestore = getFirestore();
    const state = getState();
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const userId = firebase.auth().currentUser.uid;
    const dashboardsCount = state.dashboard.data.list.length;
    let createdDashboard = null;

    dashboardsRef
      .add({
        [firestoreCollections.dashboards.fields.META]: {
          [firestoreCollections.dashboards.fields.meta.AUTHOR_ID]: userId,
          [firestoreCollections.dashboards.fields.meta.CREATED]: new Date(),
          [firestoreCollections.dashboards.fields.meta.PARENT_ID]: userId,
        },
        [firestoreCollections.dashboards.fields.THEME]: newDashboard.theme,
        [firestoreCollections.dashboards.fields.TITLE]: newDashboard.title,
      })
      .then(result => {
        return dashboardsRef
          .doc(result.id)
          .get()
      })
      .then(result => {
        createdDashboard = result;
        return usersRef
          .doc(userId)
          .update(newDashboard.default ? {
            [firestoreCollections.users.fields.DEFAULT_DASHBOARD_ID]: result.id,
            [firestoreCollections.users.fields.DASHBOARDS_COUNT]: dashboardsCount + 1,
          } : {
            [firestoreCollections.users.fields.DASHBOARDS_COUNT]: dashboardsCount + 1,
          })
      })
      .then(() => {
        dispatch(addCreatedDashboard({
          createdDashboard,
          isDefault: newDashboard.default,
        }));
        dispatch(createDashboardSuccess({
          createdDashboard
        }));
        dispatch(resetProjectState());
      })
      .catch(error => {
        console.log(error);
        dispatch(createDashboardFailure(error));
      });
  }
};

const updateDashboardFailure = error => ({
  type: actionTypes.dashboard.UPDATE_DASHBOARD_FAILURE,
  error
});

const updateDashboardSuccess = data => ({
  type: actionTypes.dashboard.UPDATE_DASHBOARD_SUCCESS,
  updatedDashboard: data.updatedDashboard,
  newDefaultDashboardId: data.newDefaultDashboardId
});

const updateDashboardRequest = () => ({
  type: actionTypes.dashboard.UPDATE_DASHBOARD_REQUEST
});

export const updateDashboard = (newDefaultDashboardId, data) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
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
          [firestoreCollections.users.fields.DEFAULT_DASHBOARD_ID]: newDefaultDashboardId === "" ? dashboardId : newDefaultDashboardId
        })
        .catch(error => {
          console.log(error);
          dispatch(updateDashboardFailure(error));
        });
    }

    await dashboardsRef
      .doc(dashboardId)
      .update({
        [firestoreCollections.dashboards.fields.TITLE]: data.title,
        [firestoreCollections.dashboards.fields.THEME]: data.theme,
      })
      .then(() => {
        return dashboardsRef
          .doc(dashboardId)
          .get()
      })
      .then(result => {
        dispatch(updateDashboardSuccess({
          updatedDashboard: result,
          newDefaultDashboardId
        }));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateDashboardFailure(error));
      });
  }
};

const deleteDashboardFailure = error => ({
  type: actionTypes.dashboard.DELETE_DASHBOARD_FAILURE,
  error
});

const deleteDashboardSuccess = data => ({
  type: actionTypes.dashboard.DELETE_DASHBOARD_SUCCESS,
  newDefaultDashboardId: data.newDefaultDashboardId,
  deletedDashboardId: data.deletedDashboardId
});

const deleteDashboardRequest = () => ({
  type: actionTypes.dashboard.DELETE_DASHBOARD_REQUEST
});

export const deleteDashboard = newDefaultDashboardId => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(deleteDashboardRequest());

    const state = getState();
    const dashboardsCount = state.dashboard.data.list.length;
    const firebase = getFirebase();
    const firestore = getFirestore();
    const dashboardsRef = firestore.collection(firestoreCollections.dashboards.ID);
    const usersRef = firestore.collection(firestoreCollections.users.ID);
    const userId = firebase.auth().currentUser.uid;
    const dashboardId = getState().dashboard.selector.activeId;

    await dispatch(deleteProjectsInDashboard(dashboardId));

    await dashboardsRef
      .doc(dashboardId)
      .delete()
      .then(async () => {
        try {
          await usersRef
            .doc(userId)
            .update(newDefaultDashboardId !== "" ? {
              [firestoreCollections.users.fields.DEFAULT_DASHBOARD_ID]: newDefaultDashboardId,
              [firestoreCollections.users.fields.DASHBOARDS_COUNT]: dashboardsCount - 1,
            } : {
              [firestoreCollections.users.fields.DASHBOARDS_COUNT]: dashboardsCount - 1,
            })
        } catch (error) {
          console.error(error);
          dispatch(deleteDashboardFailure(error));
          return;
        }
        dispatch(deleteDashboardSuccess({
          newDefaultDashboardId,
          deletedDashboardId: dashboardId
        }));
        dispatch(getProjects());
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteDashboardFailure(error));
      });
  }
};

export const changeDashboard = newActiveId => {
  return (dispatch) => {
    if (newActiveId && newActiveId !== dashboardConfig.MAX_COUNT) {
      dispatch(resetProjectState());
    }
    dispatch({
      type: actionTypes.dashboard.CHANGE_DASHBOARD,
      activeId: newActiveId
    })
  }
};

export const resetDashboardState = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.dashboard.RESET_DASHBOARD_STATE
    })
  }
};