import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import CreateTask from './components/CreateTask';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route element={ <Board /> } path="/" />
          <Route element={ <CreateTask /> } path= "/create" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;