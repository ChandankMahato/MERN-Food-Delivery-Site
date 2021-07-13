const express = require('express');
const { addFeedBack, getFeedBack, deleteFeedBack } = require('../controller/feedback');
const router = express.Router();

router.post('/add/feedback', addFeedBack);
router.get('/get/feedback', getFeedBack);
router.post('/delete/feedback', deleteFeedBack);

module.exports = router;