let Users = require('../db/User')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let Helpers = require('../config')
let userController = {}

userController.SIGNUP = (req, res) => {
  let valid = Helpers.checkEmailValidity(req.body.email)
  if (!valid) {
    return res.status(400).send('User with that email already exists')
  }

  let passwordHashed = Helpers.hashPassword(req.body.password)

  if (passwordHashed) {
    Users.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHashed
    })
    .then((user) => {
      var token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'Alfred is da bomb')

      res.status(200).header('Auth', token).header('currentUser', user.id).send({ token: token, user: user.id, name: user.name })
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  } else {
    res.status(500).send('Server error when hashing password')
  }
}

userController.SIGNIN = (req, res) => {
  Users.findOne({
    "email": req.body.email
  })
  .then((user) => {
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (err) {
        res.status(500).send(err)
      } else if (response !== null) {
        let token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'this is the secret token!')

        res.status(200).header('Auth', token).header('currentUser', user.id).send({ token: token, id: user.id, name: user.name })
      } else {
        res.status(400).send('Invalid email or password')
      }
    })
  })
}

module.exports = userController
