import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import cinnaKanbanLogo from '../assets/cinnaKanbanLogo.png';
import pillsburyDoughboy from '../assets/pillsburyDoughboy.png';
import wooHoo from '../assets/wooHoo.mp3';

const NavBar = () => {

  const navigate = useNavigate();
  const [ doughboy, setDoughboy ] = useState(false);

  const callDoughboy = () => {
    const audio = document.getElementById("giggle");
    audio.play();
    if (doughboy === false) {
      setDoughboy(true);
      dismissDoughboy();
    }
  };

  const delay = (ms) => new Promise(res => setTimeout(res, ms))

  const dismissDoughboy = async () => {
    await delay(2000);
    setDoughboy(false);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={cinnaKanbanLogo}
              alt="CinnaKanban Logo"
              className="navbar-brand"
              height="70px"
              onClick={ () => navigate("/") }
            />
            <div className="display-6">Group 5 Board</div>
          </div>
          <div>
            <button className="btn btn-outline-light" onClick={ () => callDoughboy() }>
              DON'T CLICK
            </button>
          </div>
        </div>
      </nav>
      <img
        src={ pillsburyDoughboy }
        alt="Pillsbury Doughboy"
        id="pillsbury-doughboy"
        className={
          doughboy === true ?
          "animate" :
          null
        }
      />
      <audio id="giggle">
        <source src={ wooHoo } type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default NavBar