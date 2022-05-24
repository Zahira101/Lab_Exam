const express = require("express");
const mongoose = require("mongoose");


const app = express();
mongoose.connect("mongodb://localhost/registration",{
    useNewUrlParser : true,
    useUnifiedTopology:true
});

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.use(require("./routes/index"));

app.listen(3000, ()=>{console.log("Server Started at port 3000")});