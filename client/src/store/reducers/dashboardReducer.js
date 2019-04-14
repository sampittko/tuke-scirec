import actionTypes from '../actionTypes';
import {dashboardConfig} from '../../config/app';
import {getActiveDashboard} from '../../utils/dashboardUtils';
import {getRouteFromString} from "../../utils/appConfigUtils";

const _initialState = {
  data: {
    list: null,
    default: null,
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
          ...state.data,
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
          activeRoute: getRouteFromString(action.createdDashboard.data().title),
          activeId: action.createdDashboard.id,
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
          default: action.defaultDashboard,
        },
        selector: {
          active: action.defaultDashboard,
          activeRoute: getRouteFromString(action.defaultDashboard.data().title),
          activeId: action.defaultDashboard.id,
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
      const updatedDashboardIndex = state.data.list.findIndex(dashboard => dashboard.id === action.updatedDashboard.id);
      const defaultDashboard = action.newDefaultDashboardId === "" ? action.updatedDashboard : state.data.list.find(dashboard => dashboard.id === action.newDefaultDashboardId);
      return {
        ...state,
        data: {
          list: [...state.data.list.slice(0, updatedDashboardIndex), action.updatedDashboard, ...state.data.list.slice(updatedDashboardIndex + 1)],
          default: defaultDashboard,
        },
        selector: {
          ...state.selector,
          active: action.updatedDashboard,
          activeRoute: getRouteFromString(action.updatedDashboard.data().title),
        },
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
      const newDefaultDashboard = state.data.list.find(dashboard => dashboard.id === action.newDefaultDashboardId);
      return {
        ...state,
        data: {
          list: state.data.list.filter(dashboard => dashboard.id !== action.deletedDashboardId),
          default: newDefaultDashboard ? newDefaultDashboard : state.data.default,
        },
        selector: {
          active: newDefaultDashboard ? newDefaultDashboard : state.data.default,
          activeRoute: newDefaultDashboard ? getRouteFromString(newDefaultDashboard.data().title) : getRouteFromString(state.data.default.data().title),
          activeId: newDefaultDashboard ? newDefaultDashboard.id : state.data.default.id,
          previousId: null
        },
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
          activeRoute: newActive === dashboardConfig.MAX_COUNT ? state.selector.activeRoute : getRouteFromString(newActive.data().title),
          activeId: action.activeId ? action.activeId : state.selector.previousId,
          previousId: state.selector.activeId
        }
      };

    case actionTypes.dashboard.RESET_DASHBOARD_STATE:
      console.log(actionTypes.dashboard.RESET_DASHBOARD_STATE);
      return _initialState;

    default:
      return state;
  }
};

export default dashboard;