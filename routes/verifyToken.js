const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = function(req,res,next) {
    const token = req.cookies['jwt'];
    if(!token) {
        return res.send("Access Denied");
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verifiedToken;
        next();
    }catch(err) {
        res.send("Invalid Token");
    }
};

