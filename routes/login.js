const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", (req,res) => {
    res.render("Login/login.ejs");
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
            const token = jwt.sign({ email: userEmail }, process.env.SECRET_TOKEN);
            //res.header("jwt-token", token).send(token);
            res.redirect("/books/all");    
        }
        res.redirect("/");
    }    
    catch(err) {
        console.log(err);
    }
});

router.get("/new", (req,res) => {
    res.render("Login/register.ejs");
});

router.post("/new", async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        const saveUser = await user.save();
        console.log(user);
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/out", (req,res) => {
    res.render("Login/login.ejs");
});


module.exports = router;