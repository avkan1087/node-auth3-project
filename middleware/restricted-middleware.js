const jwt = require("jsonwebtoken");
const secrets = require('../secrets/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, tokenData) => {
    if (error){
        res.status(401).json({ message: "Invalid token"})
    } else {
        req.username = tokenData.username;
        next();
    }
    })
}
};


