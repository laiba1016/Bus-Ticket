
const express = require('express');
const router = express.Router();
const { createRoute, getRoutes } = require('../Controllers/Route');

router.route('/')
    .post(createRoute)
    .get(getRoutes);

module.exports = router;
