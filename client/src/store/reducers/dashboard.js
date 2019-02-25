import actionTypes from '../actionTypes';

const _initialState = {
  data: {
    list: null,
    default: null
  },
  selector: {
    active: null,
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
          ].sort((dashboard1, dashboard2) => dashboard2.created.seconds - dashboard1.created.seconds),
          default: state.data.defaultDashboard
        },
      }

    case actionTypes.CREATE_DASHBOARD_SUCCESS:
      console.log(actionTypes.CREATE_DASHBOARD_SUCCESS);
      return {
        ...state,
        selector: {
          active: state.data.list.find(dashboard => dashboard.created.seconds === action.activeId),
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
            .sort((dashboard1, dashboard2) => dashboard2.created.seconds - dashboard1.created.seconds),
          default: defaultDashboard
        },
        selector: {
          active: defaultDashboard,
          activeId: defaultDashboard.created.seconds,
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

    case actionTypes.GET_DEFAULT_DASHBOARD_REQUEST:
      console.log(actionTypes.GET_DEFAULT_DASHBOARD_REQUEST);
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.GET_DEFAULT_DASHBOARD_SUCCESS:
      console.log(actionTypes.GET_DEFAULT_DASHBOARD_SUCCESS);
      return {
        ...state,
        data: {
          list: state.list,
          default: action.defaultDashboard
        },
        isLoading: false,
        error: null
      };

    case actionTypes.GET_DEFAULT_DASHBOARD_FAILURE:
      console.log(actionTypes.GET_DEFAULT_DASHBOARD_FAILURE);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case actionTypes.CHANGE_DASHBOARD:
      console.log(actionTypes.CHANGE_DASHBOARD);
      return {
        ...state,
        selector: {
          active: action.activeId ? (
            state.data.list.find(dashboard => dashboard.created.seconds === action.activeId)
            ) : (
              state.data.list.find(dashboard => dashboard.created.seconds === state.selector.previousId)
            ),
          activeId: action.activeId ? action.activeId : state.selector.previousId,
          previousId: state.selector.activeId
        }
      }

    default:
      return state
  }
}

export default dashboard;