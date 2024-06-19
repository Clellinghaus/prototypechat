import React from "react";
import { auth } from "./App";

export function LogOut() {
  return (
    auth.currentUser && (
      <button className="logout" onClick={() => auth.signOut()}>
        Ausloggen
      </button>
    )
  );
}
