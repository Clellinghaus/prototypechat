import React from "react";
import firebase from "firebase/compat/app";
import { auth } from "./App";

export function Register() {
  const registerWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="register" onClick={registerWithGoogle}>
        Register
      </button>
    </>
  );
}
