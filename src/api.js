// =========================
//  API SERVICE FOR FRONTEND
// =========================

// URL твоего backend API
const API_URL = "http://localhost:5111/api";

// Храним access & refresh токены
export let accessToken = localStorage.getItem("accessToken") || null;
export let refreshToken = localStorage.getItem("refreshToken") || null;

// Функция для обновления токена
async function refreshTokens() {
    if (!refreshToken) return null;

    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
        });

        if (!res.ok) return null;

        const data = await res.json();

        accessToken = data.accessToken;
        refreshToken = data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return accessToken;
    } catch {
        return null;
    }
}

// Универсальный запрос с автоматическим рефрешем токена
async function request(url, options = {}) {
    if (!options.headers) options.headers = {};
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let res = await fetch(API_URL + url, options);

    // Если токен протух → пробуем обновить
    if (res.status === 401) {
        const newToken = await refreshTokens();
        if (!newToken) {
            logout();
            throw new Error("Unauthorized");
        }

        // повторяем запрос с новым токеном
        options.headers["Authorization"] = `Bearer ${newToken}`;
        res = await fetch(API_URL + url, options);
    }

    return res;
}

// =========================
//     AUTH API
// =========================

export async function register(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed");
    }

    return await res.json();
}


export async function login(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Login failed");

    const tokens = await res.json();

    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return tokens;
}

export function logout() {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

// Получить текущего юзера
export async function getMe() {
    const res = await request("/auth/me", {
        method: "GET"
    });

    if (!res.ok) throw new Error("Cannot get user");

    return await res.json();
}

// =========================
//   CONTRACT ANALYSIS API
// =========================

export async function analyzeContract(sourceCode) {
    const res = await request("/contracts/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceCode })
    });

    if (!res.ok) throw new Error("Error analyzing contract");

    return await res.json();
}

export async function getHistory(userId) {
    const res = await request(`/contracts/user/${userId}`, {
        method: "GET"
    });

    if (!res.ok) throw new Error("Cannot load history");
    return await res.json();
}

