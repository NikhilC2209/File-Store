const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = function(req,res,next) {
    const token = req.cookies['jwt'];

    try {
        if(!token) {
            req.token = null;
        }
        else {
            const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);
            req.token = verifiedToken.name;
        }    
        next();
    }catch(err) {
        res.send("Invalid Token");
    }
};
