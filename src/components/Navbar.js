import React from 'react'
import PropTypes from 'prop-types';
import About from './About';
import { Link } from 'react-router-dom';
 function Navbar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <Link className="navbar-brand" to="/homepage">Text Utils</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/About">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/textform">Text App</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee">Employee Search</Link>
                        </li>
                    </ul>
                    <div class="form-check form-switch ms-auto">
                        <input class="form-check-input" type="checkbox" onClick={props.toggleMode} role="switch" id="flexSwitchCheckDefault"/>
                        <label class={`form-check-label  for="flexSwitchCheckDefault" text-${props.mode==='light'? 'dark':'light'}`}>{props.modeText}</label>
                     </div>
                </div>
            
            </nav>      
    </div>
  )
}


Navbar.propTypes = {
    title : PropTypes.string,
    aboutText : PropTypes.string,
    modeText: PropTypes.string
}

Navbar.defaultProps ={
    title : 'set title here',
    aboutText : 'set About text',
    modeText: 'Enable LightModes'
}

export default Navbar;