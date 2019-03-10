import actionTypes from '../actionTypes';

export const pickTheme = theme => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.themePicker.PICK_THEME,
      theme
    })
  }
}

export const invertTheme = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.themePicker.INVERT_THEME
    })
  }
}

export const resetThemePicker = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.themePicker.RESET_THEME_PICKER
    })
  }
}

export const setPredefinedTheme = theme => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.themePicker.SET_PREDEFINED_THEME,
      theme: theme.id,
      inverted: theme.inverted
    })
  }
}