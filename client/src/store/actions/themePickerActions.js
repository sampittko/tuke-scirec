import actionTypes from '../actionTypes';

export const pickTheme = theme => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.PICK_THEME,
      theme
    })
  }
}

export const invertTheme = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.INVERT_THEME
    })
  }
}

export const resetThemePicker = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.RESET_THEME_PICKER
    })
  }
}