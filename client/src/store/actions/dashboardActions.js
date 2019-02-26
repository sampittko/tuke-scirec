import actionTypes from '../actionTypes';
import firestoreCollections from '../../config/firebase/collections';

const getDefaultDashboardFailure = error => ({
  type: actionTypes.GET_DEFAULT_DASHBOARD_FAILURE,
  error
})

const getDefaultDashboardSuccess = result => ({
  type: actionTypes.GET_DEFAULT_DASHBOARD_SUCCESS,
  defaultDashboard: result.data()
})

const getDefaultDashboardRequest = () => ({
  type: actionTypes.GET_DEFAULT_DASHBOARD_REQUEST
})

export const getDefaultDashboard = currentUserId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getDefaultDashboardRequest());

    const firestore = getFirestore();
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.DASHBOARDS.ID);

    usersRef
      .doc(currentUserId).get()
      .then(result => {
        return dashboardsRef
          .doc(result.data().defaultDashboard.id).get()
      }).then(result => {
        dispatch(getDefaultDashboardSuccess(result));
      }).catch(error => {
        console.log(error);
        dispatch(getDefaultDashboardFailure(error));
      });
  }
}

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
    const usersRef = firestore.collection(firestoreCollections.USERS.ID);
    const dashboardsRef = firestore.collection(firestoreCollections.DASHBOARDS.ID);
    const currentUserId = getState().user.data.id;

    const createdDashboard = {
      color: newDashboard.color,
      created: new Date().getTime(),
      name: newDashboard.name,
      user: usersRef.doc(currentUserId)
    }

    dashboardsRef
      .add(createdDashboard)
    .then(result => {
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