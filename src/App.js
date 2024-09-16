import React from 'react';
import { TrafficLightProvider } from './TrafficLightContext';
import TrafficLight from './TrafficLight';

function App() {
  return (
    <TrafficLightProvider>
      <TrafficLight />
    </TrafficLightProvider>
  );
}

export default App;
