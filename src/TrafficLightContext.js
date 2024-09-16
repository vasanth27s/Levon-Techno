import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  currentLight: 'green',
  pedestrianRequest: false,
  timer: 10,
  isEmergency: false,
};

const CHANGE_LIGHT = 'CHANGE_LIGHT';
const REQUEST_CROSSING = 'REQUEST_CROSSING';
const RESET_TIMER = 'RESET_TIMER';
const EMERGENCY_OVERRIDE = 'EMERGENCY_OVERRIDE';

const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LIGHT:
      return { ...state, currentLight: action.payload, timer: action.timer };
    case REQUEST_CROSSING:
      return { ...state, pedestrianRequest: true };
    case RESET_TIMER:
      return { ...state, timer: action.timer };
    case EMERGENCY_OVERRIDE:
      return { ...state, isEmergency: true, currentLight: 'red', timer: 7 };
    default:
      return state;
  }
};

export const TrafficLightContext = createContext();

export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  useEffect(() => {
    if (!state.isEmergency) {
      const interval = setInterval(() => {
        let newLight = state.currentLight;
        let newTimer = 10;

        if (state.currentLight === 'green') {
          newLight = 'yellow';
          newTimer = 3;
        } else if (state.currentLight === 'yellow') {
          newLight = state.pedestrianRequest ? 'red' : 'green';
          newTimer = state.pedestrianRequest ? 7 : 10;
        } else if (state.currentLight === 'red') {
          newLight = 'green';
        }

        dispatch({ type: CHANGE_LIGHT, payload: newLight, timer: newTimer });
      }, state.timer * 1000);

      return () => clearInterval(interval);
    }
  }, [state.currentLight, state.timer, state.isEmergency, state.pedestrianRequest]); 

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};
