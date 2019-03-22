import actionTypes from '../actionTypes';

const _initialState = {
  theme: 0,
  inverted: false,
  dashboardSettingsMode: false,
};

const themePicker = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.themePicker.PICK_THEME:
      console.log(actionTypes.themePicker.PICK_THEME);
      return {
        ...state,
        theme: action.theme
      };

    case actionTypes.themePicker.INVERT_THEME:
      console.log(actionTypes.themePicker.INVERT_THEME);
      return {
        ...state,
        inverted: !state.inverted
      };

    case actionTypes.themePicker.RESET_THEME_PICKER:
      console.log(actionTypes.themePicker.RESET_THEME_PICKER);
      return _initialState;

    case actionTypes.themePicker.SET_PREDEFINED_THEME:
      console.log(actionTypes.themePicker.SET_PREDEFINED_THEME);
      return {
        ...state,
        theme: action.theme,
        inverted: action.inverted
      };

    case actionTypes.themePicker.TOGGLE_DASHBOARD_SETTINGS_MODE:
      console.log(actionTypes.themePicker.TOGGLE_DASHBOARD_SETTINGS_MODE);
      return {
        ...state,
        dashboardSettingsMode: !state.dashboardSettingsMode
      };

    default:
      return state
  }
};

export default themePicker;