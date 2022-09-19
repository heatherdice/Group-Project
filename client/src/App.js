import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CreateTask from './components/CreateTask';
import NavBar from './components/NavBar';
import UpdateTask from './components/UpdateTask';
import ViewTask from './components/ViewTask';
import './App.css';

function App() {
  
  // Task state / status value from Board to Form
  const [ buttonState, setButtonState ] = useState();

  return (
    <div className="container">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route element={ <Home buttonState={ buttonState } setButtonState={ setButtonState } /> } path="/" />
          <Route element={ <CreateTask buttonState={ buttonState } setButtonState={ setButtonState } /> } path= "/task/create" />
          <Route element={ <UpdateTask /> } path= "/updatetask/:id" />
          <Route element={ <ViewTask /> } path= "/task/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;