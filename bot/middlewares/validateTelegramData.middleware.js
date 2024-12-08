const crypto = require("crypto");

function validateTelegramData(req, res, next) {
    const { initData } = req.body; 
    const botToken = process.env.BOT_TOKEN; 

    if (!initData || !botToken) {
        return res.status(400).json({ error: "Invalid data or bot token" });
    }

    const data = new URLSearchParams(initData);
    const hash = data.get("hash");
    data.delete("hash");

    const dataCheckString = Array.from(data.entries())
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");

    const secretKey = crypto
        .createHmac("sha256", "WebAppData")
        .update(botToken)
        .digest();

    const calculatedHash = crypto
        .createHmac("sha256", secretKey)
        .update(dataCheckString)
        .digest("hex");

    if (calculatedHash !== hash) {
        return res.status(403).json({ error: "Invalid data signature" });
    }

    const authDate = Number(data.get("auth_date"));
    const currentTime = Math.floor(Date.now() / 1000);
    const MAX_AGE = 86400; 

    if (currentTime - authDate > MAX_AGE) {
        return res.status(403).json({ error: "Data is outdated" });
    }

    next();
}

module.exports = validateTelegramData;