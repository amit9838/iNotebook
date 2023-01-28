let jwt = require('jsonwebtoken');
const JWT_SECRET = 'amit'

const fetchuser = (req, res, next) => {
    // Get the user from jwt and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        console.log("token found")
        res.status(401).send({ error: "Please authenticeate using valid token." })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticeate using valid token." })
    }
}

module.exports = fetchuser