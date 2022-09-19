import React from 'react'
import { useNavigate } from 'react-router-dom';
import cinnaKanbanLogo from '../assets/cinnaKanbanLogo.png';

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid">
          <img
            src={cinnaKanbanLogo}
            alt="CinnaKanban Logo"
            className="navbar-brand"
            height="50px"
            onClick={ () => navigate("/") }
          />
        </div>
      </nav>
    </div>
  )
}

export default NavBar