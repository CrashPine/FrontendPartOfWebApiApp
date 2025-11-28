import React from "react";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({ from, text }) {
    return (
        <div className={`msg ${from}`}>
            <ReactMarkdown>
                {text}
            </ReactMarkdown>
        </div>
    );
}

