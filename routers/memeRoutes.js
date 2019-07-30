const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeControllers');

const isLogged = (req, res, next) => {
    if (req.session.logged) {
        req.session.message  = '';
        next()
    } else {
        req.session.message = 'Please login to access this page.';
        res.redirect('/');
    }
}

const currentUserId = (req, res, next) => {
    if (req.session.userId) {
        res.locals.userId = req.session.userId;
        next();
    } else {
        userId = '';
        res.redirect('/');
    }
}

router.get('/', isLogged, currentUserId, memeController.index);
router.get('/new', isLogged, currentUserId, memeController.new);
router.post('/', isLogged, currentUserId, memeController.create);
router.get('/:id', isLogged, currentUserId, memeController.meme);
router.get('/:id/edit', isLogged, currentUserId, memeController.edit);
router.put('/:id', isLogged, currentUserId, memeController.update);
router.delete('/:id', isLogged, currentUserId, memeController.delete);


module.exports = router;