const { createHmac } = require('node:crypto');

function parseInitData(initData) {
    const q = new URLSearchParams(initData);
    const hash = q.get("hash");
    q.delete("hash");
    const v = Array.from(q.entries());
    v.sort(([aN], [bN]) => aN.localeCompare(bN));
    const data_check_string = v.map(([n, v]) => `${n}=${v}`).join("\n");
    console.log(data_check_string);
    return { hash, data_check_string };
  }
  
  function checkSignature(bot_token, initData) {
    const { hash, data_check_string } = parseInitData(initData);
  
    const secret_key = createHmac("sha256", "WebAppData").update(bot_token).digest();
    const key = createHmac("sha256", secret_key)
      .update(data_check_string)
      .digest("hex");
  
    return key === hash;
  }

function validateTelegramData(req, res, next) {
    const { initData } = req.body; 
    const botToken = process.env.BOT_TOKEN; 

    if (!initData || !botToken) {
        return res.status(400).json({ error: "Invalid data or bot token" });
    }

    initData.user = JSON.stringify(initData.user)

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

    if (!checkSignature(botToken, initData)) {
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