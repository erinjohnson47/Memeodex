const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/register', userController.register);
router.post('/login',userController.login);
router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.profile);
// router.get('/:id/edit', userContoller.edit);
// router.put('/:id', userController.update);
// router.delete('/:id', userController.delete);

module.exports = router;