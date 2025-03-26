const shortid = require("shortid");
const URL = require('../models/url');

async function handlegenerateshortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL required" });

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render("home", {
        id:shortID
    })
}
async function handlegetshortUrl(req,res){
    const shortId = req.params.shortid;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
     let redirectUrl = entry.redirectURL;

    if (!/^https?:\/\//i.test(redirectUrl)) { //checking if url starts with https
        redirectUrl = "https://" + redirectUrl;
    }

    return res.redirect(redirectUrl);
};

async function handlegetAnalytics(req,res){
    const shortId=req.params.shortid;
    const result=await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports = {
    handlegenerateshortURL,
    handlegetAnalytics,
    handlegetshortUrl,
};