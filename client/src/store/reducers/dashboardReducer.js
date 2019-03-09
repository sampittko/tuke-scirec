import actionTypes from '../actionTypes';
import { dashboardConfig } from '../../config/app';
import { getActiveDashboard } from '../../utils/dashboardUtils';

const _initialState = {
  data: {
    list: null,
    default: null
  },
  selector: {
    active: null,
    activeRoute: null,
    activeId: null,
    previousId: null
  },
  isLoading: false,
  error: null,
};

const dashboard = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.dashboard.CREATE_DASHBOARD_REQUEST:
      console.log(actionTypes.dashboard.CREATE_DASHBOARD_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.dashboard.ADD_CREATED_DASHBOARD:
      console.log(actionTypes.dashboard.ADD_CREATED_DASHBOARD);
      return {
        ...state,
        data: {
          list: [
            action.createdDashboard,
            ...state.data.list
          ],
          default: action.isDefault ? action.createdDashboard : state.data.default,
        },
      };

    case actionTypes.dashboard.CREATE_DASHBOARD_SUCCESS:
      console.log(actionTypes.dashboard.CREATE_DASHBOARD_SUCCESS);
      return {
        ...state,
        selector: {
          active: action.createdDashboard,
          activeRoute: action.createdDashboard.data().route,
          activeId: action.createdDashboard.data().created,
          previousId: state.selector.activeId
        },
        isLoading: false,
        error: null
      };

    case actionTypes.dashboard.CREATE_DASHBOARD_FAILURE:
      console.log(actionTypes.dashboard.CREATE_DASHBOARD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.dashboard.GET_DASHBOARDS_REQUEST:
      console.log(actionTypes.dashboard.GET_DASHBOARDS_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.dashboard.GET_DASHBOARDS_SUCCESS:
      console.log(actionTypes.dashboard.GET_DASHBOARDS_SUCCESS);
      return {
        ...state,
        data: {
          list: action.dashboards,
          default: action.defaultDashboard
        },
        selector: {
          active: action.defaultDashboard,
          activeRoute: action.defaultDashboard.data().route,
          activeId: action.defaultDashboard.data().created,
          previousId: null
        },
        isLoading: false,
        error: null,
      };

    case actionTypes.dashboard.GET_DASHBOARDS_FAILURE:
      console.log(actionTypes.dashboard.GET_DASHBOARDS_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.dashboard.UPDATE_DASHBOARD_REQUEST:
      console.log(actionTypes.dashboard.UPDATE_DASHBOARD_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.dashboard.UPDATE_DASHBOARD_SUCCESS:
      console.log(actionTypes.dashboard.UPDATE_DASHBOARD_SUCCESS);
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.dashboard.UPDATE_DASHBOARD_FAILURE:
      console.log(actionTypes.dashboard.UPDATE_DASHBOARD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.dashboard.DELETE_DASHBOARD_REQUEST:
      console.log(actionTypes.dashboard.DELETE_DASHBOARD_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.dashboard.DELETE_DASHBOARD_SUCCESS:
      console.log(actionTypes.dashboard.DELETE_DASHBOARD_SUCCESS);
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.dashboard.DELETE_DASHBOARD_FAILURE:
      console.log(actionTypes.dashboard.DELETE_DASHBOARD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.dashboard.CHANGE_DASHBOARD:
      console.log(actionTypes.dashboard.CHANGE_DASHBOARD);
      const newActive = getActiveDashboard(state.data.list, action.activeId, state.selector);
      return {
        ...state,
        selector: {
          active: newActive,
          activeRoute: newActive === dashboardConfig.MAX_COUNT ? state.selector.activeRoute : newActive.data().route,
          activeId: action.activeId ? action.activeId : state.selector.previousId,
          previousId: state.selector.activeId
        }
      };

    case actionTypes.dashboard.RESET_DASHBOARD_STATE:
      console.log(actionTypes.dashboard.RESET_DASHBOARD_STATE);
      return _initialState;

    case actionTypes.dashboard.CHANGE_DASHBOARD_TO_DEFAULT:
      console.log(actionTypes.dashboard.CHANGE_DASHBOARD_TO_DEFAULT);
      return {
        ...state,
        selector: {
          active: state.data.default,
          activeRoute: state.data.default.data().route,
          activeId: state.data.default.data().created,
          previousId: state.selector.activeId
        }
      }

    default:
      return state;
  }
}

export default dashboard;