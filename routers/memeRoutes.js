const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeControllers');

const isLogged = (req, res, next) => {
    if (req.session.logged) {
        next()
    } else {
        req.session.message = 'You must be logged in';
        res.redirect('/');
    }
}

router.get('/', isLogged, memeController.index);
router.get('/new', isLogged, memeController.new);
router.post('/', isLogged, memeController.create);
router.get('/:id', isLogged, memeController.meme);
router.get('/:id/edit', isLogged, memeController.edit);
router.put('/:id', isLogged, memeController.update);
router.delete('/:id', isLogged, memeController.delete);


module.exports = router;