import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Тут логика авторизации. Для демо — сразу в чат
        navigate("/chat");
    };

    return (
        <div className="auth-wrapper">
            <form className="auth-card" onSubmit={handleLogin}>
                <h2>Вход</h2>

                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Пароль" required />

                <button className="auth-btn" type="submit">Войти</button>

                <p className="link">
                    Нет аккаунта? <a href="/register">Регистрация</a>
                </p>
            </form>
        </div>
    );
}
