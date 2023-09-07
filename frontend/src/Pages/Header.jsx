import React from "react";
import "../Styles/header.css";
import { FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout, isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className="header-container">
        <Link to="/"><h2>superTut</h2></Link>
       
      <div className="right-nav">
      {isAuthenticated && (
          <div className="user-details">
             <img src={user.picture} alt={user.name} />
            <h3>{user.name}</h3>
          </div>
        )}
        {isAuthenticated ? (
          <button
            className="btn-class"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            LogOut
          </button>
        ) : (
          <div className="right-nav">
            <button className="btn-class">Tutor LogIn</button>
            <button className="btn-class" onClick={() => loginWithRedirect()}>
            Student LogIn
          </button>
          </div>
          
        )}
       
      </div>
      <FaBars className="bars" />
    </div>
  );
};

export default Header;
