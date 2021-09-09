import React, { useState } from "react";
import netflixLogo from '../images/netflix-logo.png';
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const hadnleDomLoad = (e) => {
    setDomLoaded(true);
  };
  window.addEventListener("DOMContentLoaded", hadnleDomLoad);
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src={netflixLogo}
          alt=""
        />
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>

        <div className="loginScreen__gradient"></div>
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1 className={`${domLoaded && "loginScreen__animation"}`}>
              Unlimited films, TV programmes and more.
            </h1>
            <h2 className={`${domLoaded && "loginScreen__animation"}`}>
              Watch anywhere. Cancel at any time.
            </h2>
            <h3 className={`${domLoaded && "loginScreen__animation"}`}>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div
              className={`loginScreen__input ${
                domLoaded && "loginScreen__animation"
              }`}
            >
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
