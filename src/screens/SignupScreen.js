import React from "react";
import "./SignupScreen.css";

function SignupScreen() {
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input placeholder="Email" type="Email" />
        <input placeholder="Password" type="passwords" />
        <button type="submit">Sign In</button>
        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          Sign Up now.
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
