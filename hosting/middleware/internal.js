require('dotenv').config();

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

const checkInternalToken = (req, res, next) => {
    const token = req.headers['x-internal-token'];
  
    if (token === INTERNAL_TOKEN) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
}

module.exports = checkInternalToken