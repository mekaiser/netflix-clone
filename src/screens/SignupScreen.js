import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import "./SignupScreen.css";

function SignupScreen() {
  const [accountSignUp, setAccountSignUp] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const formSubmit = (e) => {
    e.preventDefault();
    if (accountSignUp) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => {
          alert(error.message);
        });
    } 
    else if (!accountSignUp) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <div className="signupScreen signupScreen__animation">
      <form onSubmit={formSubmit}>
        <h1>Sign In</h1>
        <input
          className="signupScreen__input"
          ref={emailRef}
          placeholder="Email"
          type="Email"
          required
        />
        <input
          className="signupScreen__input"
          ref={passwordRef}
          placeholder="Password"
          type="password"
          required
        />
        {accountSignUp ? (
          <input
            className="signupScreen__submit"
            type="submit"
            value="Sign Up"
          />
        ) : (
          <input
            className="signupScreen__submit"
            type="submit"
            value="Sign In"
          />
        )}

        <h5>
          <span className="signupScreen__gray">
            {accountSignUp ? "Already have an account?" : "New to Netflix?"}{" "}
          </span>
          {accountSignUp ? (
            <span
              className="signupScreen__link"
              onClick={() => setAccountSignUp(false)}
            >
              Sign In.
            </span>
          ) : (
            <span
              className="signupScreen__link"
              onClick={() => setAccountSignUp(true)}
            >
              Sign Up now.
            </span>
          )}
        </h5>
      </form>
    </div>
  );
}

export default SignupScreen;
