import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import "./../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login({email, password});

            // Сохраняем токены
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);

            navigate("/chat");
        } catch (err) {
            setError("Неверный email или пароль");
        }
    };

    return (
        <div className="auth-wrapper">
            <form className="auth-card" onSubmit={handleLogin}>
                <h2>Вход</h2>

                {error && <p className="error">{error}</p>}

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

                <button className="auth-btn" type="submit">
                    Войти
                </button>

                <p className="link">
                    Нет аккаунта? <a href="/register">Регистрация</a>
                </p>
            </form>
        </div>
    );
}
