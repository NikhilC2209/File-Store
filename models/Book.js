const mongoose = require("mongoose");

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
        type: Buffer,
        required: true,
    },
    coverImageType: {
        type: String,
        required: true,
    },
    Tags: {
        type: String,
        required: true,
    }
})

booksSchema.virtual("coverImagePath").get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})


module.exports = mongoose.model("Book", booksSchema);