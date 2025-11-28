import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "../components/MessageBubble";
import TypingDots from "../components/TypingDots";
import { analyzeContract } from "../api";
import "../styles/chat.css";
import "../styles/variables.css";

export default function Chat() {
    const [messages, setMessages] = useState([
        { from: "ai", text: "Привет! Я анализирую твой смарт‑контракт…" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const listRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { from: "user", text: input.trim() };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await analyzeContract(userMsg.text);
            setMessages((m) => [...m, { from: "ai", text: res.text }]);
        } catch (err) {
            setMessages((m) => [...m, { from: "ai", text: "Ошибка при анализе." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleLogout = () => {
        navigate("/login");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-root">
            <div className="app">
                <header className="topbar">
                    <div className="username">Mirror Wndr</div>
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                </header>

                <main className="messages" ref={listRef}>
                    {messages.map((m, i) => (
                        <MessageBubble key={i} from={m.from} text={m.text} />
                    ))}

                    {isTyping && (
                        <div className="typing-wrapper">
                            <div className="msg ai">
                                <TypingDots />
                            </div>
                        </div>
                    )}
                </main>

                <footer className="inputBar">
          <textarea
              className="chat-input"
              placeholder="Введите смарт‑контракт / вопрос..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
          />
                    <button className="send" onClick={handleSend}>
                        Send
                    </button>
                </footer>
            </div>
        </div>
    );
}
