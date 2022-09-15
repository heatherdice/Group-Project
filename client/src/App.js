import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route element={ <Board /> } path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;