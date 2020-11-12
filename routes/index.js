const express = require("express");
const router = express.Router();
const Books = require("../models/Book");

router.get("/", (req,res) => {
    res.render("first");
});

module.exports = router;