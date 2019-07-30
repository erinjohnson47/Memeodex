const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

const isLogged = (req, res, next) => {
    if (req.session.logged) {
        next()
    } else {
        req.session.message = 'Please login to access this page.';
        res.redirect('/');
    }
}

router.get('/register', userController.register);
router.post('/login',userController.login);
router.get('/', isLogged, userController.index);
router.post('/', userController.create);
router.get('/:id', isLogged,userController.profile);
router.get('/:id/edit', isLogged, userController.edit);
router.put('/:id', isLogged, userController.update);
router.delete('/:id', isLogged, userController.delete);

module.exports = router;