const express = require('express');
const { initialData } = require('../controller/initialdata');
const router = express.Router();

router.get('/user/initialdata', initialData);

module.exports = router;