const actionTypes = {
  auth: {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    GET_AUTH: 'GET_AUTH',
  },
  dashboard: {
    CREATE_DASHBOARD_REQUEST: 'CREATE_DASHBOARD_REQUEST',
    CREATE_DASHBOARD_SUCCESS: 'CREATE_DASHBOARD_SUCCESS',
    CREATE_DASHBOARD_FAILURE: 'CREATE_DASHBOARD_FAILURE',
    GET_DASHBOARDS_REQUEST: 'GET_DASHBOARDS_REQUEST',
    GET_DASHBOARDS_SUCCESS: 'GET_DASHBOARDS_SUCCESS',
    GET_DASHBOARDS_FAILURE: 'GET_DASHBOARDS_FAILURE',
    UPDATE_DASHBOARD_REQUEST: 'UPDATE_DASHBOARD_REQUEST',
    UPDATE_DASHBOARD_SUCCESS: 'UPDATE_DASHBOARD_SUCCESS',
    UPDATE_DASHBOARD_FAILURE: 'UPDATE_DASHBOARD_FAILURE',
    DELETE_DASHBOARD_REQUEST: 'DELETE_DASHBOARD_REQUEST',
    DELETE_DASHBOARD_SUCCESS: 'DELETE_DASHBOARD_SUCCESS',
    DELETE_DASHBOARD_FAILURE: 'DELETE_DASHBOARD_FAILURE',
    CHANGE_DASHBOARD: 'CHANGE_DASHBOARD',
    RESET_DASHBOARD_STATE: 'RESET_DASHBOARD_STATE',
    CHANGE_DASHBOARD_TO_DEFAULT: 'CHANGE_DASHBOARD_TO_DEFAULT',
    ADD_CREATED_DASHBOARD: 'ADD_CREATED_DASHBOARD',
  },
  themePicker: {
    PICK_THEME: 'PICK_THEME',
    INVERT_THEME: 'INVERT_THEME',
    RESET_THEME_PICKER: 'RESET_THEME_PICKER',
    SET_PREDEFINED_THEME: 'SET_PREDEFINED_THEME',
  },
  project: {
    ADD_PROJECT_REQUEST: 'ADD_PROJECT_REQUEST',
    ADD_PROJECT_SUCCESS: 'ADD_PROJECT_SUCCESS',
    ADD_PROJECT_FAILURE: 'ADD_PROJECT_FAILURE',
    GET_PROJECT: 'GET_PROJECT',
    GET_PROJECTS_REQUEST: 'GET_PROJECTS_REQUEST',
    GET_PROJECTS_SUCCESS: 'GET_PROJECTS_SUCCESS',
    GET_PROJECTS_FAILURE: 'GET_PROJECTS_FAILURE',
    DELETE_PROJECTS_IN_DASHBOARD_REQUEST: 'DELETE_PROJECTS_IN_DASHBOARD_REQUEST',
    DELETE_PROJECTS_IN_DASHBOARD_SUCCESS: 'DELETE_PROJECTS_IN_DASHBOARD_SUCCESS',
    DELETE_PROJECTS_IN_DASHBOARD_FAILURE: 'DELETE_PROJECTS_IN_DASHBOARD_FAILURE',
    RESET_PROJECT_STATE: 'RESET_PROJECT_STATE',
  },
}

export default actionTypes;