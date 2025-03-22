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

app.get("/:shortid", async (req, res) => {
    const shortId = req.params.shortid;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.redirect(`https://${entry.redirectURL}`);
});

app.use('/url', urlRoute);


app.listen(PORT, () => console.log(`Running on ${PORT}`));