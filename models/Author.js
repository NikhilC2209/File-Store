const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Author", authorSchema);