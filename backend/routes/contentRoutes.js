const express = require('express');
const { generateContent, generateCampaign } = require('../controllers/contentController');

const router = express.Router();

router.post('/generate', generateContent);
router.post('/generate-campaign', generateCampaign);

module.exports = router;