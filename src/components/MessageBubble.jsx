import React from "react";
import "../styles/chat.css";

export default function MessageBubble({ from = "ai", text }) {
    return (
        <div className={`msg ${from === "ai" ? "ai" : "user"}`}>
            {text}
        </div>
    );
}
