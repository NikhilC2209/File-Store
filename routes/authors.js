const express = require("express");
const router = express.Router();
const Authors = require("../models/Author.js");

router.get("/", (req,res) => {
    res.send("Authors Main Page");
})

router.get("/find", (req,res) => {
    res.send("Search for an author");
})

router.get("/new", async (req,res) => {
    try {
        const allAuthors = await Authors.find({});
        res.render("Authors/new_author.ejs", {authors: allAuthors});
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

router.post("/post", async (req,res) => {
    const Author = new Authors({
        Name: req.body.name,
    })
    try {
        const newAuthor = await Author.save();
        res.redirect("/authors/all");
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/all", async (req,res) => {
    try {
        const allauthors = await Authors.find({});
        res.render("authors/List.ejs", {authors: allauthors});    
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

module.exports = router;