const express = require('express');
const path=require("path");
const  connectMongo = require('./connection');
const cookieParser=require("cookie-parser");
const {checkAuth,restrictToLoggedinUserOnly}=require("./middlewares/auth")

const URL = require("./models/url");

const urlRoute = require('./routes/url'); // normal routes
const staticRoute=require('./routes/staticRouter');// EJS
const userRoute=require("./routes/user");// auth

const app = express();
const PORT = 8000;

// Connect to MongoDB
connectMongo("mongodb://127.0.0.1:27017/shorturl")
    .then(() => console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());// parsing json data
app.use(express.urlencoded({extended:false})); //parsing form
app.use(cookieParser());

app.use("/user",userRoute); //auth
app.use("/",checkAuth,staticRoute);// creates EJS file

app.use("/url",restrictToLoggedinUserOnly, urlRoute);// create shorturl




app.listen(PORT, () => console.log(`Running on ${PORT}`));