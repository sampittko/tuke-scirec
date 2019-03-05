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