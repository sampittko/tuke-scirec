import actionTypes from '../actionTypes';

const _initialState = {
  data: {
    list: [],
    default: null
  },
  selector: {
    active: null,
    previous: null
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

    case actionTypes.CREATE_DASHBOARD_SUCCESS:
      console.log(actionTypes.CREATE_DASHBOARD_SUCCESS);
      return {
        ...state,
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
      return {
        ...state,
        data: {
          list: action.dashboards
            .map(dashboard => dashboard.data())
            .sort((dashboard1, dashboard2) => dashboard2.created.seconds - dashboard1.created.seconds),
          default: action.dashboards.filter(dashboard => dashboard.id === action.defaultDashboardId)[0].data()
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

    default:
      return state
  }
}

export default dashboard;