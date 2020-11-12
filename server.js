if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/basic");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

mongoose.connect(process.env.Database_Url, { useNewUrlParser: true })
const db = mongoose.connection
db.once("open", () => {
    console.log("Connected");   
})
db.on("error", (error) => {
    console.log(error);
})

const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");
const authorRouter = require("./routes/authors");
app.use("/",indexRouter);
app.use("/books",booksRouter);
app.use("/authors",authorRouter);

app.listen(3000,() => {
    console.log("Server up and running at http://127.0.0.1:3000");
})

//app.listen(process.env.PORT || 3000)