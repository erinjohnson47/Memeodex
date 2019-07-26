const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeControllers');

router.get('/', memeController.index);


module.exports = router;