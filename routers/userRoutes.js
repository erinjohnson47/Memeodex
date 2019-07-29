const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

const isLogged = (req, res, next) => {
    if (req.session.logged) {
        next()
    } else {
        req.session.message = 'You must be logged in';
        res.redirect('/');
    }
}

router.get('/register', userController.register);
router.post('/login',userController.login);
router.get('/', userController.index);
router.post('/', userController.create);
router.get('/logout', userController.logout)
router.get('/:id', userController.profile);
router.get('/:id/edit', isLogged, userController.edit);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;