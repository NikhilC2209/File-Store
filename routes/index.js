const express = require("express");
const router = express.Router();
const Books = require("../models/Book");
const checkToken = require("./checkToken.js");

/*function checkToken() {
    const token = req.cookies['jwt'];
    if(!token) {
        return null;
    }
    else {
        const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        return verifiedToken.name;
    }    
}*/

router.get("/", checkToken, (req,res) => {
    console.log(req.token);
    res.render("first", {token: req.token});
});

module.exports = router;