// src/api.js
// Простейшая заглушка для имитации запроса на анализ смарт-контракта.
// В реальном проекте замените fetchURL и логику.
const BASE = "/api"; // если используешь proxy — проксируются /api

export async function analyzeContract(prompt) {
    // имитация задержки + ответ
    await new Promise((r) => setTimeout(r, 1200));
    return {
        text: `Анализ завершен. Найдены возможные места риска в функции: withdraw(). (заглушка)`,
    };

    // пример реального запроса:
    // const res = await fetch(`${BASE}/analyze`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt })
    // });
    // return res.json();
}
