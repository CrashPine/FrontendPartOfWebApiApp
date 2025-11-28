import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "./../styles/auth.css";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register({
                username,
                email,
                password
            });

            navigate("/");
        } catch (err) {
            setError(err.message || "Ошибка регистрации");
        }
    };


    return (
        <div className="auth-wrapper">
            <form className="auth-card" onSubmit={handleRegister}>
                <h2>Регистрация</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="auth-btn">Создать аккаунт</button>

                <p className="link">
                    Уже есть аккаунт? <a href="/login">Вход</a>
                </p>
            </form>
        </div>
    );
}
