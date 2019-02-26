import actionTypes from '../actionTypes';

export const pickColor = color => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.PICK_COLOR,
      color
    })
  }
}

export const invertColor = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.INVERT_COLOR
    })
  }
}