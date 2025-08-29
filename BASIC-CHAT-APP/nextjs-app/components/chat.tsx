"use client";

import { useState } from "react";

export function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <div
  dangerouslySetInnerHTML={{
    __html: response
      // .replace(/nl/g, "<br/>")         // convert "nl" → newline
      .replace(/\n/g, "<br/>")         // convert \n → newline
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // **bold**
      .replace(/^\* ?(.*)$/gm, "• $1"),  // * bullet → • bullet
  }}
></div>


{/* the text area!x */}
  <div
    style={{
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      background: "transparent",
      zIndex: 100,
      boxSizing: "border-box",
      padding: "1em", // margin from all sides
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        background: "#6c2eb7",
        borderRadius: "1.5em",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        padding: "0.5em 1em",
        position: "relative",
      }}
    >
      <textarea
        disabled={loading}
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={1}
        style={{
          flex: 1,
          resize: "none",
          border: "none",
          outline: "none",
          background: "#6c2eb7",
          color: "#fff",
          fontSize: "1em",
          padding: "0.5em 1em 0.5em 0.5em", // left/right padding
          minHeight: "2em",
          maxHeight: "6em",
          overflowY: "hidden",
          width: "100%", // spread to full length
        }}
        onInput={e => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "2em";
          target.style.height = Math.min(target.scrollHeight, 96) + "px";
        }}
         onKeyDown={e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && message.trim()) {
        setLoading(true);
        setMessage("");
        fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ message }),
        })
          .then(async (res) => {
            if (res.ok) {
              await res.json().then((data) => {
                setError("");
                setResponse(data.message);
              });
            } else {
              await res.json().then((data) => {
                setError(data.error);
                setResponse("");
              });
            }
          })
          .finally(() => setLoading(false));
      }
    }
  }}
      />
      <button
        style={{
          border: "none",
          background: "none",
          padding: "0.5em",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: "1em", // always at right, margin from edge
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={() => {
          setLoading(true);
          setMessage("");
          fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({
              message,
            }),
          })
            .then(async (res) => {
              if (res.ok) {
                await res.json().then((data) => {
                  setError("");
                  setResponse(data.message);
                });
              } else {
                await res.json().then((data) => {
                  setError(data.error);
                  setResponse("");
                });
              }
            })
            .finally(() => setLoading(false));
        }}
      >
        <svg width="32" height="32" viewBox="0 0 48 48" fill="#fff">
          <path d="M44.9,23.2l-38-18L6,5A2,2,0,0,0,4,7L9.3,23H24a2.1,2.1,0,0,1,2,2,2,2,0,0,1-2,2H9.3L4,43a2,2,0,0,0,2,2l.9-.2,38-18A2,2,0,0,0,44.9,23.2Z" />
        </svg>
      </button>
    </div>
  </div>
</div>
  );
}
