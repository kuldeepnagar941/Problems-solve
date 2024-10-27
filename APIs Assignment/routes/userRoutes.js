const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const varifyauth = require('../middlewares/verifyauth')


router.post('/users',varifyauth, userController.createUser);
router.get('/users',varifyauth, userController.getAllUser);
router.get('/users/:id',varifyauth, userController.getOneUser);
router.put('/users/:id',varifyauth, userController.updateUser);
router.delete('/users/:id',varifyauth, userController.deleteUser);


router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)

module.exports = router;
