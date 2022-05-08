import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="btn btn-primary btn-info me-3"
      onClick={() => loginWithPopup()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
