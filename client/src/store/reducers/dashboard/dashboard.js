import { getActiveDashboard, sortDashboardsByCreated } from '../../../utils/dashboardUtils';

import actionTypes from '../../actionTypes';
import { dashboardConfig } from '../../../config/app';

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
  error: null
};

const dashboard = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_DASHBOARD_REQUEST:
      console.log(actionTypes.CREATE_DASHBOARD_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.ADD_CREATED_DASHBOARD:
      console.log(actionTypes.ADD_CREATED_DASHBOARD);
      return {
        ...state,
        data: {
          list: [
            ...state.data.list,
            action.createdDashboard
          ].sort((dashboard1, dashboard2) => sortDashboardsByCreated(dashboard1, dashboard2)),
          default: state.data.defaultDashboard
        },
      }

    case actionTypes.CREATE_DASHBOARD_SUCCESS:
      console.log(actionTypes.CREATE_DASHBOARD_SUCCESS);
      const createdDashboard = state.data.list.find(dashboard => dashboard.created === action.activeId);
      return {
        ...state,
        selector: {
          active: createdDashboard,
          activeRoute: createdDashboard.route,
          activeId: action.activeId,
          previousId: state.selector.activeId
        },
        isLoading: false,
        error: null
      };

    case actionTypes.CREATE_DASHBOARD_FAILURE:
      console.log(actionTypes.CREATE_DASHBOARD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.GET_DASHBOARDS_REQUEST:
      console.log(actionTypes.GET_DASHBOARDS_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.GET_DASHBOARDS_SUCCESS:
      console.log(actionTypes.GET_DASHBOARDS_SUCCESS);
      const defaultDashboard = action.dashboards.find(dashboard => dashboard.id === action.defaultDashboardId).data();
      return {
        ...state,
        data: {
          list: action.dashboards
            .map(dashboard => dashboard.data())
            .sort((dashboard1, dashboard2) => sortDashboardsByCreated(dashboard1, dashboard2)),
          default: defaultDashboard
        },
        selector: {
          active: defaultDashboard,
          activeRoute: defaultDashboard.route,
          activeId: defaultDashboard.created,
          previousId: null
        },
        isLoading: false,
        error: null
      };

    case actionTypes.GET_DASHBOARDS_FAILURE:
      console.log(actionTypes.GET_DASHBOARDS_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.CHANGE_DASHBOARD:
      console.log(actionTypes.CHANGE_DASHBOARD);
      const newActive = getActiveDashboard(state.data.list, action.activeId, state.selector);
      return {
        ...state,
        selector: {
          active: newActive,
          activeRoute: newActive === dashboardConfig.MAX_COUNT ? state.selector.activeRoute : newActive.route,
          activeId: action.activeId ? action.activeId : state.selector.previousId,
          previousId: state.selector.activeId
        }
      }

    default:
      return state
  }
}

export default dashboard;