const express = require("express");
const router = express.Router();
const path = require("path");
const Books = require("../models/Book.js");
const imagePath = path.join("public", Books.coverImageBasePath);
const fs = require("fs");
const Authors = require("../models/Author.js");
const multer = require("multer");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const upload = multer({
    dest: imagePath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

router.get("/", (req, res) => {
    res.render("Books/home_page");
});

router.get("/all", async (req,res) =>  {
    try {
        const allBooks = await Books.find();
        res.render("Books/List.ejs", {books: allBooks});
    }
    catch {
        res.redirect("/");
    }
})

router.get("/find", async (req,res) =>  {
    var searchBar = {};
    if (req.query.name != null && req.query.name !== "") {
        searchBar.Name = new RegExp(req.query.name, "i");
        console.log("Working");
    }
    try {
        const findBooks = await Books.find(searchBar);
        res.render("Books/find.ejs", {booksy: findBooks, searchBar: req.query });
        console.log(findBooks);
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/new", async (req,res) => {
    try {
        const allAuthors = await Authors.find().sort({ Name: 1}).limit(4).exec();
        res.render("Books/new_book.ejs", {authors: allAuthors});    
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

function removeBookCover(fileName) {
    fs.unlink(path.join(imagePath, fileName), (err) => {
        if (err) {
            console.log(err);
        }
    })
}

router.post("/post", upload.single("cover") , async (req,res) => {
    //if (req.file != null) {
    //    const fileName = req.file.fileName;
    //}
    //else {
    //    const fileName = null;
    //}

    const fileName = req.file != null ? req.file.filename : null;

    console.log(req.file.filename);

    const Book = new Books({
        Name: req.body.name,
        Author: req.body.author,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        coverImage: fileName,
        Tags: req.body.tags,
    });
    try {
        const newBook = await Book.save();
        res.redirect("/books/find");
    }
    catch (error){
       // res.render("Books/new_page", {
       //     book: book,
       //     errorMessage: "Error creating Book"
       // })
       removeBookCover(Book.coverImage);;
       console.log(error);
       res.redirect("/books/all");
    }
});

module.exports = router;    