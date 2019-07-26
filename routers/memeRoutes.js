const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeControllers');

router.get('/', memeController.index);
router.get('/new', memeController.new);


module.exports = router;