"use client";

import { title } from "process";
import { useState, useEffect } from "react";

export function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [error, setError] = useState("");
  const [dots, setDots] = useState(".");

  // animate dots for typing bubble
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    const msgToSend = message;
    setMessage("");
    setLoading(true);

    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: msgToSend }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setError("");
          setMessages((prev) => [...prev, { role: "ai", text: data.message }]);
        } else {
          const data = await res.json();
          setError(data.error);
          setMessages((prev) => [...prev, { role: "ai", text: data.error }]);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <head>
      <title>
        Jacked AI
      </title>
      </head>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          background: "#6c2eb7",
          color: "white",
          textAlign: "center",
          padding: "1em",
          fontSize: "1.2em",
          fontWeight: "bold",
          zIndex: 200,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <span
        style={
          { fontSize: "1.5em", fontWeight: "bold", color: "white" }
        }
        >Jacked AI</span>
      </header>

      {/* Chat history */}
      <div style={{ padding: "5em 1em 6em 1em",
                    minHeight: "100vh",
                    backgroundImage: "url('/background.jpeg')",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    overflow:"hidden",
                    position:"relative",
                    
       }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "0.5em",
            }}
          >
            <div
              style={{
                      background: msg.role === "user" ? "#8b5cf6" : "#e5e7eb",
                      color: msg.role === "user" ? "white" : "black",
                      padding: "0.7em 1em",
                      borderRadius: "1em",
                      maxWidth: "70%",
                      whiteSpace: "pre-wrap",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.85)", 
                    }}
              dangerouslySetInnerHTML={{
                __html: msg.text
                  .replace(/\n/g, "<br/>")
                  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                  .replace(/^\* ?(.*)$/gm, "• $1"),
              }}
            />
          </div>
        ))}

        {/* Typing bubble when AI is loading */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "0.5em",
            }}
          >
            <div
              style={{
                background: "#e5e7eb",
                color: "black",
                padding: "0.7em 1em",
                borderRadius: "1em",
                maxWidth: "50%",
                fontStyle: "italic",
              }}
            >
              {dots}
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
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
          padding: "1em",
          boxSizing: "border-box",
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
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            style={{
              flex: 1,
              resize: "none",
              border: "none",
              outline: "none",
              background: "#6c2eb7",
              color: "#fff",
              fontSize: "1em",
              padding: "0.5em 1em 0.5em 0.5em",
              minHeight: "2em",
              maxHeight: "6em",
              overflowY: "hidden",
              width: "100%",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "2em";
              target.style.height = Math.min(target.scrollHeight, 96) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!loading) sendMessage();
              }
            }}
          />
          <button
            disabled={loading}
            style={{
              border: "none",
              background: "none",
              padding: "0.5em",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: "1em",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: loading ? 0.5 : 1,
            }}
            onClick={sendMessage}
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
