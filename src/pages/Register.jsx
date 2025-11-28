import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/auth.css";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Заглушка: регистрируем и идём на вход
        navigate("/login");
    };

    return (
        <div className="auth-wrapper">
            <form className="auth-card" onSubmit={handleRegister}>
                <h2>Регистрация</h2>

                <input type="text" placeholder="Имя пользователя" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Пароль" required />

                <button className="auth-btn" type="submit">Создать аккаунт</button>

                <p className="link">
                    Уже есть аккаунт? <a href="/login">Вход</a>
                </p>
            </form>
        </div>
    );
}
