const crypto = require('crypto');

const verifyDataIntegrity = (initDataUnsafe, hash, token) => {
    const dataCheckString = Object.entries(initDataUnsafe).sort().map(([k, v]) => {
        if (typeof v === "object" && v !== null) {
            v = JSON.stringify(v);
        }

        if (typeof v === "string" && /(https?:\/\/[^\s]+)/.test(v)) {
            v = v.replace(/\//g, "\\/");
        }
        
        return `${k}=${v}`;
    }).join("\n");

    const secret = crypto.createHmac("sha256", "WebAppData").update(token);
    const calculatedHash = crypto.createHmac("sha256", secret.digest()).update(dataCheckString).digest("hex");
    
    return calculatedHash === hash;
};

function validateTelegramData(req, res, next) {
    const { initData } = req.body; 
    const botToken = process.env.BOT_TOKEN; 

    if (!initData || !botToken) {
        return res.status(400).json({ error: "Invalid data or bot token" });
    }

    const { hash, ...rest } = initData;

    // initData.user = JSON.stringify(initData.user)

    // const data = new URLSearchParams(initData);
    // const hash = data.get("hash");
    // data.delete("hash");

    // const dataCheckString = Array.from(data.entries())
    //     .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    //     .map(([key, value]) => `${key}=${value}`)
    //     .join("\n");

    // console.log(dataCheckString);

    // const secretKey = crypto
    //     .createHmac("sha256", "WebAppData")
    //     .update(botToken)
    //     .digest();

    // const calculatedHash = crypto
    //     .createHmac("sha256", secretKey)
    //     .update(dataCheckString)
    //     .digest("hex");

    if (!verifyDataIntegrity(rest, hash, botToken)) {
        return res.status(403).json({ error: "Invalid data signature" });
    }

    const authDate = Number(rest.auth_date);
    const currentTime = Math.floor(Date.now() / 1000);
    const MAX_AGE = 86400; 

    if (currentTime - authDate > MAX_AGE) {
        return res.status(403).json({ error: "Data is outdated" });
    }

    next();
}

module.exports = validateTelegramData;