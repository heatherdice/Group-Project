import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        {/* Use NavLink instead of the <a></a> link tag for the navbar when you create/style it */}
        <NavLink to={'/'} >Kanban Board</NavLink>
    </div>
  )
}

export default NavBar