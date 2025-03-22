const express = require('express');
const urlRoute = require('./routes/url');
const URL = require("./models/url");
const { connectMongo } = require('./connection');

const app = express();
const PORT = 8000;

// Connect to MongoDB
connectMongo("mongodb://127.0.0.1:27017/shorturl")
    .then(() => console.log("MongoDB connected"))

app.use(express.json());

app.use("/", urlRoute);

app.use('/url', urlRoute); // create shorturl


app.listen(PORT, () => console.log(`Running on ${PORT}`));