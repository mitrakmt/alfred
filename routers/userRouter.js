let userRouter = require('express').Router()
let userController = require('../controllers/userController')

userRouter.post('/signin', userController.SIGNIN)
userRouter.post('/signup', userController.SIGNUP)
userRouter.delete('/')

module.exports = userRouter
