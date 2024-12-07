const express = require('express')
const router = express.Router();
const userController = require('../controller/user')

const verifyAuth = require("../middleware/verifyAuth")


router.post('/singup', userController.userSignUp)

router.post('/login', userController.userLogin)

router.get('/', verifyAuth, userController.getAllUser)
router.delete('/:id',verifyAuth,userController.deleteUser)


module.exports = router;