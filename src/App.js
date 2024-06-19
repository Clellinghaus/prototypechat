import React from "react";
import "./App.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { Register } from "./Register";
import { LogOut } from "./LogOut";
import { ChatRoom } from "./ChatRoom";

firebase.initializeApp({
  apiKey: "AIzaSyCE_TsSuWyNDzKgMU9yjE53hRKr-TMl_QA",
  authDomain: "fir-4dd53.firebaseapp.com",
  projectId: "fir-4dd53",
  storageBucket: "fir-4dd53.appspot.com",
  messagingSenderId: "757432663178",
  appId: "1:757432663178:web:8762976070cd1956dac173",
});
export const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h4">Chat-Room</Typography>
          </Toolbar>
          <LogOut />
        </AppBar>
      </Box>
      <section>{user ? <ChatRoom /> : <Register />}</section>
    </div>
  );
}
export default App;
