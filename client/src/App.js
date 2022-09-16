import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route element={ <Home /> } path="/" />
          <Route element = { <CreateTask /> } path="/create" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;