import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ text }) {
    return (
        <div className="chat-message markdown">
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
}
