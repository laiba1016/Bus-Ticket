const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactus');

router.post('/submit', submitContact);

module.exports = router;

