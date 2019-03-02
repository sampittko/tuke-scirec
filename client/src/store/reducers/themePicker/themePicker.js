import actionTypes from '../../actionTypes';

const _initialState = {
  theme: 0,
  inverted: false
}

const themePicker = (state = _initialState, action) => {
  switch (action.type) {
    case actionTypes.PICK_THEME:
      console.log(actionTypes.PICK_THEME);
      return {
        ...state,
        theme: action.theme
      }

    case actionTypes.INVERT_THEME:
      console.log(actionTypes.INVERT_THEME);
      return {
        ...state,
        inverted: !state.inverted
      }

    case actionTypes.RESET_THEME_PICKER:
      console.log(actionTypes.RESET_THEME_PICKER);
      return _initialState;

    default:
      return state
  }
}

export default themePicker;