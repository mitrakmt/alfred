let userRouter = require('express').Router()
let userController = require('../controllers/userController')

userRouter.post('/signin', userController.SIGNIN)
userRouter.post('/signup', userController.SIGNUP)
userRouter.put('/edit', userController.EDIT)
userRouter.delete('/delete', userController.DELETE)

module.exports = userRouter
