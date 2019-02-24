import actionTypes from '../actionTypes';

const _initialState = {
  isLoading: false,
  data: {
    dashboards: null,
    projects: null,
    defaultDashboard: null
  },
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
          dashboards: action.dashboards
            .map(dashboard => dashboard.data())
            .sort((dashboard1, dashboard2) => dashboard2.created.seconds - dashboard1.created.seconds),
          projects: state.data.projects,
          defaultDashboard: action.dashboards.filter(dashboard => dashboard.id === action.defaultDashboardId)[0].data()
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
        isLoading: false,
        data: {
          dashboards: state.data.dashboards,
          projects: state.data.projects,
          defaultDashboard: action.defaultDashboard
        },
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