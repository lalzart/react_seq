// import * as actionTypes from "./actions";

const initialState = {
  running: false,
  bpm: 120,
  step: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SEQ":
      return {
        ...state,
        running: !state.running
      };
    case "CHANGE_BPM":
      return {
        ...state,
        bpm: action.val
      };
    case "INCREMENT":
      return {
        ...state,
        step: state.step + 1
      };
    case "RESET_SEQ":
      return {
        ...state,
        step: 0
      };
  }

  return state;
};

export default reducer;
