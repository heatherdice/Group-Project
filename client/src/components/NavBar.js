import React from 'react'
import { useNavigate } from 'react-router-dom';
import cinnaKanbanLogo from '../assets/cinnaKanbanLogo.png';

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid justify-content-start">
          <img
            src={cinnaKanbanLogo}
            alt="CinnaKanban Logo"
            className="navbar-brand"
            height="70px"
            onClick={ () => navigate("/") }
          />
          <div className="display-6">Group 5 Board</div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar