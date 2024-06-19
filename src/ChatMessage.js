import { auth } from "./App";
import React, { useState } from "react";

export function ChatMessage(props) {
  const [answer, setAnswer] = useState("");

  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const getAnswer = async (text) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer sk-proj-BG0zIJZBv2Zls88eU0LeT3BlbkFJ67m2caWFMeVthYLmNr14"
    );
    myHeaders.append(
      "Cookie",
      "__cf_bm=X68ux4BzP.7usFFeVubN.5LBAUtsH4w4TRVw4XNlzGw-1718806340-1.0.1.1-3NVXu84AXs9mzWvC_e3UFoRJF3IIHdaNH.InfNNqqUVuO7FvAX9dcEGqr9gvGhsVO5fsKJ659jCAyc1dSEPwyA; _cfuvid=vQUobJN.2ErkQfHH3P98uh_V7m_h3I7Tfwh4h.NcBj4-1718806340037-0.0.1.1-604800000"
    );

    const raw = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Schreibe für mich eine Antwort auf folgenden Text und schreibe keine Kommentare:" +
            text,
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions
      );
      const result = await response.json();
      const answer = result.choices[0].message.content;
      setAnswer(answer);
      props.onAnswerReceived(answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          alt=""
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p onClick={(e) => getAnswer(text)}> {text} </p>
      </div>
    </>
  );
}
