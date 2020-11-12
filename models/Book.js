const mongoose = require("mongoose");
const path = require("path");
const coverImageBasePath = "uploads/coverImages";

const booksSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author",
    },
    publishDate: {
        type: Date,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
    coverImage: {
        type: String,
        required: true,
    },
    Tags: {
        type: String,
        required: true,
    }
})

booksSchema.virtual("coverImagePath").get(function() {
    if (this.coverImage != null) {
        return path.join("/", coverImageBasePath, this.coverImage);
    }
})


module.exports = mongoose.model("Book", booksSchema);
module.exports.coverImageBasePath = coverImageBasePath;