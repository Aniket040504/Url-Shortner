const express = require('express');
const { handlegenerateshortURL, handlegetAnalytics, handlegetshortUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handlegenerateshortURL); // POST route to create a short URL

router.get('/analytics/:shortid',handlegetAnalytics)

router.get('/:shortid' , handlegetshortUrl)

module.exports = router;