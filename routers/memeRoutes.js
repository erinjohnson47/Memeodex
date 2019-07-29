const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeControllers');

router.get('/', memeController.index);
router.get('/new', memeController.new);
router.post('/', memeController.create);
router.get('/:id', memeController.meme);
router.get('/:id/edit', memeController.edit);
router.put('/:id', memeController.update);
router.delete('/:id', memeController.delete);


module.exports = router;