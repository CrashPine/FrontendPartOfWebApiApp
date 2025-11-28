import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "../components/MessageBubble";
import TypingDots from "../components/TypingDots";
import { analyzeContract, getMe, getHistory, logout } from "../api";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [userName, setUsername] = useState("User");
    const listRef = useRef(null);
    const navigate = useNavigate();

    // --- загрузка истории ---
    useEffect(() => {
        initChat();
    }, []);

    async function initChat() {
        try {
            const me = await getMe();
            setUsername(me.userName || me.email);

            const history = await getHistory(me.id);

            // переводим анализы в сообщения
            const historyMessages = history.map(h => ({
                from: "ai",
                text: h.summary
            }));

            setMessages([
                { from: "ai", text: "Hi! Here's your test history:" },
                ...historyMessages
            ]);
        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    // автоскролл
    useEffect(() => {
        if (listRef.current)
            listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, isTyping]);

    // отправка нового анализа
    const handleSend = async () => {
        if (!input.trim()) return;

        const text = input.trim();
        setInput("");

        const userMsg = { from: "user", text };
        setMessages(m => [...m, userMsg]);

        setIsTyping(true);

        try {
            const res = await analyzeContract(text);

            setMessages(m => [
                ...m,
                { from: "ai", text: res.summary || res.analysisText }
            ]);
        } catch {
            setMessages(m => [...m, { from: "ai", text: "Error during analysis" }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const onKeyDown = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-root">
            <div className="app">
                <header className="topbar">
                    <div className="username">{userName}</div>
                    <button className="logout" onClick={handleLogout}>Logout</button>
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
                        placeholder="Enter a smart contract or question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                    />
                    <button className="send" onClick={handleSend}>Send</button>
                </footer>
            </div>
        </div>
    );
}
