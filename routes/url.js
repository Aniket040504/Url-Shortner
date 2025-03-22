const express = require('express');
const { handlegenerateshortURL, handlegetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handlegenerateshortURL); // POST route to create a short URL

router.get('/analytics/:shortid',handlegetAnalytics)

module.exports = router;