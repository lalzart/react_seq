import * as actionTypes from "./actions";

const initialState = {
  bpm: 120,
  step: null,
  activeInstrument: "BassDrum",
  intervalID: undefined,
  instruments: {
    BassDrum: {
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
    ClsdHihat: {
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
    Accent: {
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
    // case actionTypes.TOGGLE_SEQ:
    //   return {
    //     ...state,
    //     running: !state.running
    //   };
    case actionTypes.BPM_CHANGE:
      return {
        ...state,
        bpm: action.val
      };
    case actionTypes.INCREMENT:
      return {
        ...state,
        step: state.step + 1
      };
    case actionTypes.RESET_SEQ:
      return {
        ...state,
        step: 0
      };
    case actionTypes.ACTIVATE_STEP:
      const arr = state.activeInstrument;
      return {
        ...state,
        instruments: {
          ...state.instruments,
          [arr]: {
            ...state.instruments[arr],
            track: state.instruments[arr].track.map((el, i) =>
              action.pl === i ? !el : el
            )
          }
        }
      };
    case actionTypes.ACTIVE_INSTRUMENT:
      return {
        ...state,
        activeInstrument: !state.activeInstrument,
        ...state,
        // eslint-disable-next-line
        activeInstrument: action.pl
      };
    case actionTypes.ACTIVATE_INSTRUMENT:
      let selected = state.activeInstrument;
      return {
        ...state,
        instruments: {
          ...state.instruments,
          [selected]: {
            ...state.instruments[selected],
            active: !state.instruments[selected].active
          }
        }
      };
    case actionTypes.MANAGE_INTERVAL:
      return {
        ...state,
        intervalID: action.pl
      };
  }

  return state;
};

export default reducer;
