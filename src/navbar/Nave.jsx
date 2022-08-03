import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export default function Nave(props) {
  return ( <>
    <nav className="navbar navbar-expand-lg bg-transparent">
  <div className="container">
    <Link className="navbar-brand fs-4 fw-bolder" to="Home"> <i className="fa-solid fa-note-sticky"></i>Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {props.userData === null? 
        <><li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-black fw-bolder fs-4"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Login
        </a>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="SignUp">Sign Up</Link></li>
          <li><Link className="dropdown-item" to="SignIn">Sign in</Link></li>
        </ul>
      </li></> : <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle text-black fw-bolder fs-4"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          logOut
        </a>
          <ul className="dropdown-menu">
            <li><Link onClick={props.logOut} className="dropdown-item" to="SignIn">LogOut</Link></li>
          </ul>
        </li>}
      </ul>
     
    </div>
  </div>
</nav>
      
    </> );
}
