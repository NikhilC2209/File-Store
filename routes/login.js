const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const checkToken = require("./checkToken.js");

router.get("/", checkToken, (req,res) => {
    res.render("Login/login.ejs", {token: req.token});
});

router.get("/options/0", checkToken, (req,res) => {
    res.render("Login/options.ejs", {type: 0,token: req.token});
});

router.get("/options/1", checkToken, (req,res) => {
    res.render("Login/options.ejs", {type: 1,token: req.token});
});

router.post("/", async (req,res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    //let error;

    try {
        const emailExists = await User.findOne({email: userEmail});
        if(!emailExists) {
            //error = "User does not exist!";
            console.log("User does not exist!");
        }
        else {
            const validatePass = await bcrypt.compare(userPass, emailExists.password);
            if(!validatePass) {
                //error = "Password incorrect!";
                res.redirect("/login");
            } 
            const token = jwt.sign({ name: emailExists.name }, process.env.SECRET_TOKEN);
            //res.cookie('jwt-token', token);
            res.cookie('jwt', token, {httpOnly: true, maxAge: 60*60*60});
            res.redirect("/books/all");    
        }
        //res.redirect("/");
    }    
    catch(err) {
        console.log(err);
    }
});

router.get("/new", checkToken, (req,res) => {
    res.render("Login/register.ejs", {token: req.token});
});

router.post("/new", async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(user);
        const saveUser = await user.save();
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/out", checkToken, (req,res) => {
    res.cookie('jwt', '', {expires: new Date(0)});
    res.render("Login/login.ejs", {token: null});
});


module.exports = router;