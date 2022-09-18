import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CreateTask from './components/CreateTask';
import NavBar from './components/NavBar';
import ViewMember from './components/ViewMember';
import UpdateTask from './components/UpdateTask';
import ViewTask from './components/ViewTask';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route element={ <Home /> } path="/" />
          <Route element={ <CreateTask /> } path= "/create" />
          <Route element={ <ViewMember /> } path= "/member/:id" />
          <Route element={ <UpdateTask /> } path= "/updatetask/:id" />
          <Route element={ <ViewTask /> } path= "/task/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;