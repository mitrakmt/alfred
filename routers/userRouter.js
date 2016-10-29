let userRouter = require('express').Router()
let userController = require('../controllers/userController')

userRouter.post('/signin', userController.SIGNIN)
userRouter.post('/signup', userController.SIGNUP)

module.exports = userRouter
