// import * as actionTypes from "./actions";

const initialState = {
  running: false,
  bpm: 120,
  step: null,
  instruments: {
    BassDrum: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    SnareDrum: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    HiTom: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    MidTom: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    LowTom: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    RimShot: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    HandClap: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    Cowbell: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    Cymbal: {
      active: true,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    OpenHihat: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    ClosedHihat: {
      active: false,
      track: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    }
  }
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
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
    case "ACTIVATE_INSTRUMENT":
      return {
        ...state,
        instruments: {
          ...state.instruments,
          [action.pl]: {
            ...state.instruments[action.pl],
            active: !state.instruments[action.pl].active
          }
        }
      };
  }

  return state;
};

export default reducer;
