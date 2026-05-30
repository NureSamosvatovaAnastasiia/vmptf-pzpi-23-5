import React from 'react';
import Weather from './components/weather';
import JsonGenerator from './components/jsonGenerator';
import TaskBoard from './components/taskBoard';

function App() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: 'palevioletred' }}>Практичне заняття 2 (React)</h1>
      
      <Weather />
      <JsonGenerator />
      <TaskBoard />
      
    </div>
  );
}

export default App;