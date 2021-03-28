const express = require("express");
const router = express.Router();
const checkToken = require("./checkToken.js");
const Books = require("../models/Book.js");
const Authors = require("../models/Author.js");

router.get("/", (req,res) => {
    res.send("Authors Main Page");
})

router.get("/find", (req,res) => {
    res.send("Search for an author");
})

router.get("/new", checkToken, async (req,res) => {
    try {
        const allAuthors = await Authors.find({});
        res.render("Authors/new_author.ejs", {authors: allAuthors, token: req.token, myCss: null});
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

router.get("/all", checkToken, async (req,res) => {

    try {
        const allauthors = await Authors.find({});
        res.render("Authors/List.ejs", {authors: allauthors, token: req.token, myCss: null});
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/:id", checkToken, async (req,res) => {
    try {
        const find_author = await Authors.findById(req.params.id);
        const find_books = await Books.find({ Author: req.params.id }).exec();
        res.render("Authors/show_author.ejs", {
            author: find_author,
            books: find_books,
            token: req.token,
            myCss: null,
        })

    } catch(err) {
        console.log(err);
        res.redirect("/authors/all");
    }
})

module.exports = router;