import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "./../styles/auth.css";

export default function Register() {
    const navigate = useNavigate();

    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register({
                userName,
                email,
                password
            });

            navigate("/");
        } catch (err) {
            setError(err.message || "Registration error");
        }
    };


    return (
        <div className="auth-wrapper">
            <form className="auth-card" onSubmit={handleRegister}>
                <h2>Registration</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="auth-btn">Create</button>

                <p className="link">
                    Already have an account? <a href="/">Log In</a>
                </p>
            </form>
        </div>
    );
}
