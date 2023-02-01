import React from 'react';
import './Auth.css'

function AuthenticationButton({isAuthenticated, onLogin, onLogout}) {
  // Button that switches between Login and Logout dependng on isAuthenticated bool value

  return isAuthenticated ? 
    <LogoutButton onClick={onLogout} /> : 
    <LoginButton onClick={onLogin} />;
};

const LoginButton = ({onClick}) => {
  return (
    <button onClick={onClick} class="LoginButton"> 
      Login
    </button>
  );
};

const LogoutButton = ({onClick}) => {
  return (
    <button
      class="LogoutButton"
      onClick={onClick}
    >
      Log Out
    </button>
  );
};



export default AuthenticationButton;