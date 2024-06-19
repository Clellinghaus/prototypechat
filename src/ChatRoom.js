import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "./App";
import { ChatMessage } from "./ChatMessage";

export function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const handleAnswerReceived = (answer) => {
    setFormValue(answer);
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <div>
      <main>
        {messages &&
          messages.map((msg) => {
            return (
              <ChatMessage
                onAnswerReceived={(answer) => handleAnswerReceived(answer)}
                key={msg.id}
                message={msg}
              />
            );
          })}
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Schreibe eine neue Nachricht..."
        />

        <button type="submit" disabled={!formValue}>
          Senden
        </button>
      </form>
    </div>
  );
}
