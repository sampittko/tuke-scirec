import actionTypes from '../actionTypes';

const _initialState = {
  color: 0,
  inverted: false
}

const colorPicker = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.PICK_COLOR:
      console.log(actionTypes.PICK_COLOR);
      return {
        ...state,
        color: action.color
      }

    case actionTypes.INVERT_COLOR:
      console.log(actionTypes.INVERT_COLOR);
      return {
        ...state,
        inverted: !state.inverted
      }

    default:
      return state
  }
}

export default colorPicker;