let userRouter = require('express').Router()
let userController = require('../controllers/userController')

userRouter.post('/signin', userController.SIGNIN)
userRouter.post('/signup', userController.SIGNUP)
userRouter.get('/logout', userController.LOGOUT)
userRouter.get('/', userController.GET)

module.exports = userRouter;
