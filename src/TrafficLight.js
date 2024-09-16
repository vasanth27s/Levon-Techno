import React, { useContext } from 'react';
import { TrafficLightContext } from './TrafficLightContext';
import './TrafficLight.css';

const TrafficLight = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  const handlePedestrianRequest = () => {
    if (!state.pedestrianRequest) {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  const handleEmergencyOverride = () => {
    dispatch({ type: 'EMERGENCY_OVERRIDE' });
  };

  return (
    <div className="traffic-light-container">
      <div className={`light green ${state.currentLight === 'green' ? 'on' : ''}`}></div>
      <div className={`light yellow ${state.currentLight === 'yellow' ? 'on' : ''}`}></div>
      <div className={`light red ${state.currentLight === 'red' ? 'on' : ''}`}></div>

      <div className="controls">
        <button className="pedestrian-btn" onClick={handlePedestrianRequest}>
          Pedestrian Crossing
        </button>
        <button className="emergency-btn" onClick={handleEmergencyOverride}>
          Emergency Override
        </button>
      </div>
      <div className="countdown">
        Time left: {state.timer} seconds
      </div>
    </div>
  );
};

export default TrafficLight;
