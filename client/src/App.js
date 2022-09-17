import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import CreateTask from './components/CreateTask';
import NavBar from './components/NavBar';
import ViewMember from './components/ViewMember';
import UpdateTask from './components/UpdateTask';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route element={ <Board /> } path="/" />
          <Route element={ <CreateTask /> } path= "/create" />
          <Route element={ <ViewMember /> } path= "/member/:id" />
          <Route element={ <UpdateTask /> } path= "/updatetask/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;