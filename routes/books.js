const express = require("express");
const router = express.Router();
const Books = require("../models/Book.js");
const verify = require("./verifyToken.js");
const checkToken = require("./checkToken.js");
const Authors = require("../models/Author.js");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const myCss = {
    all_books: {
        path: 'book/all_books.css',
    },
}


router.get("/", verify , checkToken, (req, res) => {
    res.render("Books/home_page", {token: req.token});
});

router.get("/all", checkToken, async (req,res) =>  {
    try {
        const allBooks = await Books.find().populate("Author").exec();
        res.render("Books/List.ejs", {books: allBooks, token: req.token,myCss: myCss.all_books});
    }
    catch(err) {
        console.log(err);
        res.redirect("/");
    }
})

router.get("/find", checkToken, async (req,res) =>  {
    var searchBar = {};
    if (req.query.name != null && req.query.name !== "") {
        searchBar.Name = new RegExp(req.query.name, "i");
    }
    try {
        const findBooks = await Books.find(searchBar);
        res.render("Books/find.ejs", {booksy: findBooks, searchBar: req.query, token: req.token,myCss: null});
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/new", verify , checkToken ,async (req,res) => {
    try {
        const allAuthors = await Authors.find().sort({ Name: 1}).limit(4).exec();
        console.log(allAuthors);
        res.render("Books/new_book.ejs", {authors: allAuthors, token: req.token,myCss: null});    
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})


function saveCover(book, coverImageString) {
    if(coverImageString == null) return
    const cover = JSON.parse(coverImageString);
    if(cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, "base64");
        book.coverImageType = cover.type;
    }
}

router.post("/post", async (req,res) => {
    const Book = new Books({
        Name: req.body.name,
        Author: req.body.author,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        Tags: req.body.tags,
    });
    saveCover(Book,req.body.cover);
    console.log(Book);

    try {
        const newBook = await Book.save();
        res.redirect("/books/find");
    }
    catch (error){
       console.log(error);
       res.redirect("/books/all");
    }
});

router.get("/:id", checkToken, async (req,res) => {
    try {
        const find_book = await Books.findById(req.params.id).populate("Author").exec();
        res.render("Books/show_Book.ejs", {
            book: find_book,
            token: req.token,
        })
        console.log(find_book);
    } catch(err) {
        console.log(err);
        res.redirect("/authors/all");
    }
})

module.exports = router;    