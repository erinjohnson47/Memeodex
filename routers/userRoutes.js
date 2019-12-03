const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

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

router.get('/register', userController.register);
router.post('/login',userController.login);
// router.get('/', isLogged, currentUserId, userController.index);
router.post('/', userController.create);
router.get('/:id', isLogged, currentUserId, userController.profile);
router.get('/:id/edit', isLogged, currentUserId, userController.edit);
router.put('/:id', isLogged, currentUserId, userController.update);
router.delete('/:id', isLogged, currentUserId, userController.delete);

module.exports = router;