const express = require('express');
const urlRoute = require('./routes/url');
const path=require("path");
const staticRoute=require('./routes/staticRouter');
const URL = require("./models/url");
const  connectMongo = require('./connection');

const app = express();
const PORT = 8000;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Connect to MongoDB
connectMongo("mongodb://127.0.0.1:27017/shorturl")
    .then(() => console.log("MongoDB connected"))


app.use(express.json());// parsing json data
app.use(express.urlencoded({extended:false})); //parsing form
app.use("/url", staticRoute);

app.use("/url", urlRoute);// create shorturl

app.use('/url', urlRoute); // get redirected to url 



app.listen(PORT, () => console.log(`Running on ${PORT}`));