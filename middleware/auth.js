const jwt = require('jsonwebtoken');

function authenticate(req,res,next)
{
    const authHeader = req.headers['authorization'];
    
    if(!authHeader)
    {
        return res.status(401).send("Authorization header missing");
    }
    const token = authHeader.split(' ')[1];
    if(!token)
    {
        return res.status(401).send("Token missing");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}

module.exports = authenticate;